import { useEffect, useRef, useMemo, useState } from 'react'
import useStore from '../store'
import { Play, Monitor, Tablet, Smartphone, Lock, Ban, ChevronDown, ChevronRight, AlertTriangle, XCircle, Info } from 'lucide-react'

/**
 * Preview Panel
 * - Builds a sandboxed HTML document from all project files
 * - Injects console interceptor to capture logs
 * - Communicates via postMessage
 * - Supports responsive preview modes
 */

// Build the console interceptor script that runs inside the iframe
const CONSOLE_INTERCEPTOR = `
<script>
(function() {
  const _send = (type, args) => {
    try {
      const data = args.map(a => {
        if (a === null) return 'null';
        if (a === undefined) return 'undefined';
        if (typeof a === 'object') {
          try { return JSON.stringify(a, null, 2); } catch { return String(a); }
        }
        return String(a);
      }).join(' ');
      parent.postMessage({ type: 'console', level: type, data, time: new Date().toLocaleTimeString() }, '*');
    } catch(e) {}
  };
  const orig = { log: console.log, warn: console.warn, error: console.error, info: console.info, clear: console.clear };
  console.log = (...a) => { orig.log.apply(console, a); _send('log', a); };
  console.warn = (...a) => { orig.warn.apply(console, a); _send('warn', a); };
  console.error = (...a) => { orig.error.apply(console, a); _send('error', a); };
  console.info = (...a) => { orig.info.apply(console, a); _send('info', a); };
  console.clear = () => { orig.clear.call(console); parent.postMessage({ type: 'console-clear' }, '*'); };

  // Catch unhandled errors
  window.onerror = (msg, src, line, col, err) => {
    _send('error', [\`\${msg} (line \${line}:\${col})\`]);
    return true;
  };
  window.addEventListener('unhandledrejection', (e) => {
    _send('error', ['Unhandled Promise: ' + (e.reason?.message || e.reason || 'Unknown')]);
  });
})();
<\/script>
`;

function buildPreviewDoc(files) {
  const htmlFile = files['index.html']
  if (!htmlFile) {
    return '<html><body style="font-family:system-ui;color:#999;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#0f0f1a"><p>Create an index.html file to see preview</p></body></html>'
  }

  let html = htmlFile.content

  // Inject console interceptor right after <head> or at start
  const headIdx = html.indexOf('<head>')
  if (headIdx !== -1) {
    html = html.slice(0, headIdx + 6) + '\n' + CONSOLE_INTERCEPTOR + '\n' + html.slice(headIdx + 6)
  } else {
    html = CONSOLE_INTERCEPTOR + '\n' + html
  }

  // Replace <link rel="stylesheet" href="X"> with inline styles
  Object.entries(files).forEach(([name, file]) => {
    if (file.language === 'css') {
      const linkRegex = new RegExp(`<link[^>]*href=["']${escapeRegExp(name)}["'][^>]*/?>`, 'gi')
      html = html.replace(linkRegex, `<style>/* ${name} */\n${file.content}\n</style>`)
    }
  })

  // Replace <script src="X"></script> with inline scripts
  Object.entries(files).forEach(([name, file]) => {
    if (file.language === 'javascript') {
      const scriptRegex = new RegExp(`<script[^>]*src=["']${escapeRegExp(name)}["'][^>]*>\\s*<\\/script>`, 'gi')
      html = html.replace(scriptRegex, `<script>/* ${name} */\n${file.content}\n<\/script>`)
    }
  })

  return html
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Console entry icons
const LogIcon = ({ level }) => {
  const icons = {
    log: <ChevronRight size={14} />,
    warn: <AlertTriangle size={14} />,
    error: <XCircle size={14} />,
    info: <Info size={14} />,
  }
  return <span className="console-entry-icon">{icons[level] || icons.log}</span>
}

export default function PreviewPanel() {
  const files = useStore(s => s.files)
  const runTrigger = useStore(s => s.runTrigger)
  const previewMode = useStore(s => s.previewMode)
  const setPreviewMode = useStore(s => s.setPreviewMode)
  const showConsole = useStore(s => s.showConsole)
  const toggleConsole = useStore(s => s.toggleConsole)
  const consoleLogs = useStore(s => s.consoleLogs)
  const addConsoleLog = useStore(s => s.addConsoleLog)
  const clearConsole = useStore(s => s.clearConsole)
  const triggerRun = useStore(s => s.triggerRun)
  const iframeRef = useRef(null)
  const consoleEndRef = useRef(null)
  const [consoleH, setConsoleH] = useState(200)
  const dragRef = useRef(null)

  // Build preview document
  const previewHtml = useMemo(() => buildPreviewDoc(files), [files, runTrigger])

  // Listen for console messages from iframe
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === 'console') {
        addConsoleLog({ level: e.data.level, text: e.data.data, time: e.data.time })
      } else if (e.data?.type === 'console-clear') {
        clearConsole()
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [addConsoleLog, clearConsole])

  // Update iframe content
  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument
      if (doc) {
        doc.open()
        doc.write(previewHtml)
        doc.close()
      }
    }
  }, [previewHtml])

  // Auto-scroll console
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [consoleLogs])

  // Console resize via drag
  const handleConsoleResize = (e) => {
    e.preventDefault()
    const startY = e.clientY
    const startH = consoleH
    const onMove = (ev) => {
      const delta = startY - ev.clientY
      setConsoleH(Math.max(80, Math.min(500, startH + delta)))
    }
    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    document.body.style.cursor = 'row-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  const errorCount = consoleLogs.filter(l => l.level === 'error').length

  return (
    <div className="preview-panel">
      {/* Preview Toolbar */}
      <div className="preview-toolbar">
        <button className="toolbar-btn" onClick={triggerRun} title="Run (Ctrl+S)">
          <Play size={16} fill="currentColor" />
          Run
        </button>
        <div className="toolbar-separator" />
        {['desktop', 'tablet', 'mobile'].map(mode => (
          <button
            key={mode}
            className={`toolbar-btn ${previewMode === mode ? 'active' : ''}`}
            onClick={() => setPreviewMode(mode)}
            title={mode}
          >
            {mode === 'desktop' && <Monitor size={16} />}
            {mode === 'tablet' && <Tablet size={16} />}
            {mode === 'mobile' && <Smartphone size={16} />}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div className="preview-url-bar">
          <Lock size={12} className="lock-icon" />
          <span>localhost / preview</span>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="preview-frame-container">
        <iframe
          ref={iframeRef}
          className={`preview-frame ${previewMode}`}
          sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
          title="Preview"
        />
      </div>

      {/* Console Panel */}
      {showConsole && (
        <div className="console-panel" style={{ height: consoleH }}>
          <div
            className="split-handle"
            style={{ height: 3, cursor: 'row-resize' }}
            onMouseDown={handleConsoleResize}
          />
          <div className="console-header">
            <span className="console-tab active">
              Console
              {errorCount > 0 && <span className="console-badge">{errorCount}</span>}
            </span>
            <div style={{ flex: 1 }} />
            <button className="sidebar-icon-btn" onClick={clearConsole} title="Clear Console">
              <Ban size={16} />
            </button>
            <button className="sidebar-icon-btn" onClick={toggleConsole} title="Close Console">
              <ChevronDown size={16} />
            </button>
          </div>
          <div className="console-body">
            {consoleLogs.length === 0 && (
              <div className="console-entry log" style={{ opacity: 0.4 }}>
                <LogIcon level="info" />
                <span className="console-entry-text">Console output will appear here...</span>
              </div>
            )}
            {consoleLogs.map((log, i) => (
              <div key={i} className={`console-entry ${log.level}`}>
                <LogIcon level={log.level} />
                <span className="console-entry-text">{log.text}</span>
                <span className="console-entry-time">{log.time}</span>
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>
        </div>
      )}
    </div>
  )
}
