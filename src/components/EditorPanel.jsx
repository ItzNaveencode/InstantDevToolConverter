import { useRef, useCallback } from 'react'
import Editor from '@monaco-editor/react'
import useStore from '../store'
import { X, FileCode2 } from 'lucide-react'

// Tab icon based on language
const TabIcon = ({ lang }) => {
  const colors = { html: '#e34c26', css: '#2965f1', javascript: '#f0db4f', json: '#5b5ea6', markdown: '#519aba' }
  const labels = { html: 'H', css: 'C', javascript: 'JS', json: '{}', markdown: 'M' }
  const c = colors[lang] || '#64748b'
  return (
    <span className="tab-icon" style={{ color: c, fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700 }}>
      {labels[lang] || '·'}
    </span>
  )
}

export default function EditorPanel() {
  const files = useStore(s => s.files)
  const activeFile = useStore(s => s.activeFile)
  const openFiles = useStore(s => s.openFiles)
  const setActiveFile = useStore(s => s.setActiveFile)
  const updateFileContent = useStore(s => s.updateFileContent)
  const closeTab = useStore(s => s.closeTab)
  const editorTheme = useStore(s => s.editorTheme)
  const fontSize = useStore(s => s.fontSize)
  const wordWrap = useStore(s => s.wordWrap)
  const dirty = useStore(s => s.dirty)
  const editorRef = useRef(null)

  const handleEditorMount = useCallback((editor, monaco) => {
    editorRef.current = editor

    // Custom keybindings
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Save = clear dirty state + trigger preview
      const store = useStore.getState()
      const newDirty = new Set(store.dirty)
      newDirty.delete(store.activeFile)
      useStore.setState({ dirty: newDirty, runTrigger: store.runTrigger + 1 })
    })

    // Format document
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF, () => {
      editor.getAction('editor.action.formatDocument')?.run()
    })

    // Custom Emmet-like autocomplete for HTML
    monaco.languages.registerCompletionItemProvider('html', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position)
        const range = {
          startLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: word.endColumn,
        }
        return {
          suggestions: [
            { label: 'div', kind: monaco.languages.CompletionItemKind.Snippet, insertText: '<div>\n\t$0\n</div>', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
            { label: 'section', kind: monaco.languages.CompletionItemKind.Snippet, insertText: '<section class="$1">\n\t$0\n</section>', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
            { label: 'button', kind: monaco.languages.CompletionItemKind.Snippet, insertText: '<button id="$1">$0</button>', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
            { label: 'link:css', kind: monaco.languages.CompletionItemKind.Snippet, insertText: '<link rel="stylesheet" href="$1">', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
            { label: 'script:src', kind: monaco.languages.CompletionItemKind.Snippet, insertText: '<script src="$1"><\/script>', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
          ]
        }
      }
    })
  }, [])

  const handleChange = useCallback((value) => {
    if (activeFile && value !== undefined) {
      updateFileContent(activeFile, value)
    }
  }, [activeFile, updateFileContent])

  const currentFile = activeFile ? files[activeFile] : null

  return (
    <div className="editor-area">
      {/* Tab Bar */}
      <div className="tab-bar">
        {openFiles.map(name => {
          const file = files[name]
          if (!file) return null
          return (
            <div
              key={name}
              className={`tab ${activeFile === name ? 'active' : ''}`}
              onClick={() => setActiveFile(name)}
              onMouseDown={(e) => {
                // Middle click to close
                if (e.button === 1) { e.preventDefault(); closeTab(name) }
              }}
            >
              <TabIcon lang={file.language} />
              <span>{name}</span>
              {dirty.has(name) ? (
                <div className="tab-modified" />
              ) : (
                <button className="tab-close" onClick={(e) => { e.stopPropagation(); closeTab(name) }}>
                  <X size={14} />
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Monaco Editor */}
      <div className="editor-container">
        {currentFile ? (
          <Editor
            key={activeFile}
            height="100%"
            language={currentFile.language}
            value={currentFile.content}
            theme={editorTheme}
            onChange={handleChange}
            onMount={handleEditorMount}
            options={{
              fontSize,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontLigatures: true,
              wordWrap,
              minimap: { enabled: true, scale: 1, showSlider: 'mouseover' },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: 'smooth',
              cursorSmoothCaretAnimation: 'on',
              bracketPairColorization: { enabled: true },
              guides: { bracketPairs: true, indentation: true },
              renderLineHighlight: 'all',
              renderWhitespace: 'selection',
              suggestOnTriggerCharacters: true,
              tabSize: 2,
              padding: { top: 12 },
              lineNumbers: 'on',
              glyphMargin: false,
              folding: true,
              links: true,
              colorDecorators: true,
              contextmenu: true,
              quickSuggestions: true,
              parameterHints: { enabled: true },
              autoClosingBrackets: 'always',
              autoClosingQuotes: 'always',
              formatOnPaste: true,
            }}
          />
        ) : (
          <div className="empty-state">
            <FileCode2 size={48} className="empty-state-icon" />
            <span className="empty-state-text">Select a file to edit</span>
            <span className="empty-state-hint">Click any file in the sidebar</span>
          </div>
        )}
      </div>
    </div>
  )
}
