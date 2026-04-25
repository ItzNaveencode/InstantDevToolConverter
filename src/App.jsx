import { useState, useEffect, useRef } from 'react'
import useStore from './store'
import { toolCategories, allTools } from './utils/toolConfig'
import { Search, CheckCircle, ArrowLeft, Star, Zap, X, Copy, ExternalLink } from 'lucide-react'
import ToolPage from './components/ToolPage'

/* ─── Smart type detector ─── */
function detectInputType(raw) {
  const s = raw.trim()
  if (!s || s.length < 4) return null

  if (/^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/.test(s))
    return { label: 'JWT Token', toolId: 'jwt-decoder', color: '#7c3aed' }
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s))
    return { label: 'UUID', toolId: 'uuid-generator', color: '#2563eb' }
  if (s[0] === '{' || s[0] === '[') {
    try { JSON.parse(s); return { label: 'JSON', toolId: 'json-formatter', color: '#059669' } } catch {}
  }
  if (s[0] === '<' && s.includes('>'))
    return { label: 'XML', toolId: 'xml-formatter', color: '#dc2626' }
  if (/^https?:\/\//i.test(s))
    return { label: 'URL', toolId: 'url-encoder', color: '#0891b2' }
  if (/^\d{10}$/.test(s) || /^\d{13}$/.test(s))
    return { label: 'Unix Timestamp', toolId: 'timestamp', color: '#0891b2' }
  if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(s))
    return { label: 'Hex Color', toolId: 'color-converter', color: s }
  if (/^[\d*/,\-?LW#]+(\s+[\d*/,\-?LW#]+){4,5}$/.test(s))
    return { label: 'Cron Expression', toolId: 'cron-parser', color: '#7c3aed' }
  if (/^[A-Za-z0-9+/]+=*$/.test(s) && s.length >= 8 && s.length % 4 === 0) {
    try { const d = atob(s); if (d.length > 0) return { label: 'Base64', toolId: 'base64', color: '#d97706' } } catch {}
  }
  if (/^#{1,6}\s/.test(s) || s.includes('```'))
    return { label: 'Markdown', toolId: 'markdown-preview', color: '#2563eb' }
  return null
}

/* ─── Inline output computer ─── */
function computeOutput(input, label) {
  const s = input.trim()
  try {
    if (label === 'JWT Token') {
      const [h, p] = s.split('.')
      const b64 = x => x.replace(/-/g, '+').replace(/_/g, '/')
      const header  = JSON.parse(atob(b64(h)))
      const payload = JSON.parse(atob(b64(p)))
      const lines = []
      lines.push('── Header ─────────────────────')
      lines.push(JSON.stringify(header, null, 2))
      lines.push('')
      lines.push('── Payload ────────────────────')
      lines.push(JSON.stringify(payload, null, 2))
      if (payload.iat) lines.push(`\n  iat → ${new Date(payload.iat * 1000).toUTCString()}`)
      if (payload.exp) lines.push(`  exp → ${new Date(payload.exp * 1000).toUTCString()}`)
      return lines.join('\n')
    }
    if (label === 'JSON') {
      return JSON.stringify(JSON.parse(s), null, 2)
    }
    if (label === 'Base64') {
      return atob(s)
    }
    if (label === 'URL') {
      const url = new URL(s)
      const params = Object.fromEntries(url.searchParams)
      return JSON.stringify({
        protocol: url.protocol,
        host:     url.host,
        pathname: url.pathname,
        search:   url.search || '(none)',
        params,
        hash:     url.hash || '(none)',
      }, null, 2)
    }
    if (label === 'Unix Timestamp') {
      const n  = Number(s)
      const ms = s.length === 10 ? n * 1000 : n
      const d  = new Date(ms)
      return [
        `UTC:     ${d.toUTCString()}`,
        `ISO:     ${d.toISOString()}`,
        `Local:   ${d.toLocaleString()}`,
        `Unix ms: ${ms}`,
        `Unix s:  ${Math.floor(ms / 1000)}`,
      ].join('\n')
    }
    if (label === 'Hex Color') {
      const hex = s.replace('#', '').padEnd(6, '0')
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      const toHsl = (r, g, b) => {
        r /= 255; g /= 255; b /= 255
        const max = Math.max(r, g, b), min = Math.min(r, g, b)
        let h = 0, s = 0, l = (max + min) / 2
        if (max !== min) {
          const d = max - min
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
          switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
            case g: h = ((b - r) / d + 2) / 6; break
            case b: h = ((r - g) / d + 4) / 6; break
          }
        }
        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
      }
      return [
        `Hex:  ${s.toUpperCase()}`,
        `RGB:  rgb(${r}, ${g}, ${b})`,
        `HSL:  ${toHsl(r, g, b)}`,
        `R: ${r}  G: ${g}  B: ${b}`,
      ].join('\n')
    }
    if (label === 'UUID') {
      const parts = s.split('-')
      const version = parseInt(parts[2][0])
      return [
        `UUID:    ${s}`,
        `Version: ${version}`,
        `Variant: RFC 4122`,
        `Segment: ${parts.join(' — ')}`,
      ].join('\n')
    }
    if (label === 'Cron Expression') {
      const fields = ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week', 'Year (opt)']
      return s.split(/\s+/).map((p, i) => `${(fields[i] || '?').padEnd(14)}: ${p}`).join('\n')
    }
  } catch(e) {
    return `⚠ Error: ${e.message}`
  }
  return s
}

/* hex → rgba */
const h2r = (hex, a = 0.1) => {
  const safe = hex.startsWith('#') && hex.length >= 7 ? hex : '#4f46e5'
  const r = parseInt(safe.slice(1,3),16)
  const g = parseInt(safe.slice(3,5),16)
  const b = parseInt(safe.slice(5,7),16)
  return `rgba(${r},${g},${b},${a})`
}

/* ─────────────────────────── APP ─────────────────────────── */
export default function App() {
  const activeTool    = useStore(s => s.activeTool)
  const setActiveTool = useStore(s => s.setActiveTool)
  const toasts        = useStore(s => s.toasts)
  const favorites     = useStore(s => s.favorites)
  const copyToClipboard = useStore(s => s.copyToClipboard)

  const [search, setSearch]         = useState('')
  const [activeTab, setActiveTab]   = useState('All')
  const [smartInput, setSmartInput] = useState('')
  const [smartResult, setSmartResult] = useState(null)
  const [smartOutput, setSmartOutput] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    const h = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  useEffect(() => {
    const result = detectInputType(smartInput)
    setSmartResult(result)
    if (result) {
      setSmartOutput(computeOutput(smartInput, result.label))
    } else {
      setSmartOutput('')
    }
  }, [smartInput])

  const openTool = id => { setActiveTool(id); setSmartInput(''); setSearch('') }
  const goHome   = ()  => setActiveTool(null)
  const tabs     = ['All', 'Favorites', ...toolCategories.map(c => c.name)]

  const getSections = () => {
    const q = search.toLowerCase().trim()
    if (activeTab === 'Favorites') {
      const tools = allTools.filter(t => favorites.includes(t.id))
        .filter(t => !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
      return [{ name: 'Favorites', color: '#4f46e5', tools }]
    }
    if (activeTab !== 'All') {
      const cat = toolCategories.find(c => c.name === activeTab)
      if (!cat) return []
      return [{ ...cat, tools: cat.tools.filter(t => !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) }]
    }
    if (q) {
      const tools = allTools.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
      return [{ name: `"${search}"`, color: '#4f46e5', tools }]
    }
    return toolCategories
  }

  const sections    = getSections()
  const currentTool = activeTool ? allTools.find(t => t.id === activeTool) : null

  return (
    <div className="app">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <a className="navbar-logo" href="#" onClick={e => { e.preventDefault(); goHome() }}>
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{flexShrink:0}}>
            <defs>
              <linearGradient id="df-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#6366F1"/>
                <stop offset="100%" stopColor="#8B5CF6"/>
              </linearGradient>
            </defs>
            <rect x="4" y="4" width="40" height="40" rx="11" fill="#0F172A"/>
            <rect x="10" y="13" width="28" height="20" rx="6" fill="#1E293B"/>
            <rect x="10" y="10" width="28" height="20" rx="6" fill="url(#df-grad)"/>
            <path d="M17 19H29M29 19L25 15.5M29 19L25 22.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M31 27H19M19 27L23 23.5M19 27L23 30.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{display:'flex',flexDirection:'column',lineHeight:1.1}}>
            <span className="navbar-logo-name">Instant<span style={{color:'var(--brand)'}}>DevTool</span><span style={{color:'var(--t1)'}}>Converter</span></span>
          </div>
          <span className="navbar-logo-badge">{allTools.length} tools</span>
        </a>
        <div className="navbar-spacer" />
        {currentTool && (
          <button className="btn ghost sm" onClick={goHome}>
            <ArrowLeft size={13} /> All Tools
          </button>
        )}
      </nav>

      {currentTool ? (
        <ToolPage tool={currentTool} onBack={goHome} />
      ) : (
        <main className="home">
          <div className="page-container">

            {/* ── HERO ── */}
            <div className="hero-card">
              <div className="hero-badge">
                <span className="hero-dot" />
                {allTools.length} tools · 100% free · no signup · works offline
              </div>
              <h1>Paste anything. Get instant results.</h1>
              <p>JSON, JWT, Base64, URLs, timestamps, colors — InstantDevToolConverter detects the type and converts automatically.</p>

              {/* Smart input */}
              <div className={`smart-input-wrap ${smartResult ? 'has-result' : ''}`}>
                <div className="smart-input-icon"><Zap size={16} /></div>
                <textarea
                  ref={inputRef}
                  className="smart-input"
                  placeholder="Paste JSON, JWT, Base64, URL, UUID, timestamp, hex color, cron…  ⌘K"
                  value={smartInput}
                  onChange={e => setSmartInput(e.target.value)}
                  rows={smartResult ? 2 : 3}
                  spellCheck={false}
                />
                {smartInput && (
                  <button className="smart-clear" onClick={() => setSmartInput('')}>
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* ── SPLIT RESULT PANEL ── */}
              {smartResult && (
                <div className="smart-panel">
                  {/* Panel header */}
                  <div className="smart-panel-header">
                    <div className="smart-panel-detected">
                      <span className="smart-panel-dot" style={{ background: smartResult.color }} />
                      <strong>{smartResult.label} detected</strong>
                      <span className="smart-panel-arrow">→</span>
                      <span className="smart-panel-action">instant preview below</span>
                    </div>
                    <div style={{display:'flex',gap:8}}>
                      <button
                        className="btn sm"
                        onClick={() => copyToClipboard(smartOutput)}
                        title="Copy output"
                      >
                        <Copy size={12} /> Copy result
                      </button>
                      <button
                        className="btn primary sm"
                        onClick={() => openTool(smartResult.toolId)}
                      >
                        <ExternalLink size={12} /> Open in {smartResult.label} tool
                      </button>
                    </div>
                  </div>

                  {/* Split panes */}
                  <div className="smart-panel-split">
                    {/* INPUT pane */}
                    <div className="smart-pane">
                      <div className="smart-pane-label">INPUT</div>
                      {smartResult.label === 'Hex Color' ? (
                        <div style={{padding:'16px',display:'flex',flexDirection:'column',gap:12}}>
                          <div style={{
                            width:'100%',height:80,borderRadius:8,
                            background:smartInput.trim(),border:'1px solid var(--bdr)'
                          }} />
                          <pre className="smart-pane-code">{smartInput.trim()}</pre>
                        </div>
                      ) : (
                        <pre className="smart-pane-code">{smartInput.trim()}</pre>
                      )}
                    </div>

                    {/* divider */}
                    <div className="smart-panel-divider" />

                    {/* OUTPUT pane */}
                    <div className="smart-pane">
                      <div className="smart-pane-label" style={{color: smartResult.color}}>
                        OUTPUT — {smartResult.label}
                      </div>
                      {smartResult.label === 'Hex Color' ? (
                        <div style={{padding:'16px',display:'flex',flexDirection:'column',gap:12}}>
                          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                            {['rgb','hsl','hex'].map(fmt => (
                              <div key={fmt} style={{
                                padding:'8px 12px',background:'var(--inp)',
                                borderRadius:6,border:'1px solid var(--bdr)',
                                fontSize:11,color:'var(--t2)',fontFamily:'var(--mono)'
                              }}>
                                <div style={{fontSize:9,textTransform:'uppercase',letterSpacing:1,marginBottom:4,color:'var(--t3)'}}>{fmt}</div>
                                {smartOutput.split('\n').find(l => l.toLowerCase().startsWith(fmt))?.split(': ')[1] || '—'}
                              </div>
                            ))}
                          </div>
                          <pre className="smart-pane-code" style={{fontSize:11}}>{smartOutput}</pre>
                        </div>
                      ) : (
                        <pre className="smart-pane-code" style={{color: smartResult.label === 'JSON' || smartResult.label === 'JWT Token' ? 'inherit' : 'var(--t1)'}}>
                          {smartOutput}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Example chips (only when empty) */}
              {!smartInput && (
                <div className="smart-shortcuts">
                  {[
                    { label: 'JSON',      val: '{"name":"InstantDevToolConverter","version":"2.0","tools":24}' },
                    { label: 'JWT',       val: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' },
                    { label: 'URL',       val: 'https://api.example.com/v2/users?page=1&limit=20' },
                    { label: 'Timestamp', val: '1714003200' },
                    { label: 'Hex color', val: '#6366f1' },
                  ].map(ex => (
                    <button key={ex.label} className="smart-example" onClick={() => setSmartInput(ex.val)}>
                      Try {ex.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── FILTER BAR ── */}
            <div className="filter-bar">
              {tabs.map(tab => (
                <button
                  key={tab}
                  className={`cat-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => { setActiveTab(tab); setSearch('') }}
                >
                  {tab}
                </button>
              ))}
              <div style={{ flex:1 }} />
              <div className="filter-search">
                <Search size={13} color="var(--t3)" />
                <input
                  placeholder="Search…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* ── CATEGORY SECTIONS ── */}
            {sections.map(group => (
              <div className="category-card" key={group.name}>
                <div className="category-head">
                  <span className="category-head-title">{group.name}</span>
                  <span className="category-head-count">{group.tools.length} tool{group.tools.length !== 1 ? 's' : ''}</span>
                </div>
                {group.tools.length === 0 ? (
                  <div className="home-empty">
                    <Search size={26} color="var(--t3)" />
                    <p>No tools found</p>
                  </div>
                ) : (
                  <div className="tools-grid">
                    {group.tools.map(tool => (
                      <ToolCard key={tool.id} tool={tool} onOpen={() => openTool(tool.id)} />
                    ))}
                  </div>
                )}
              </div>
            ))}

          </div>
        </main>
      )}

      <div className="toast-wrap">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            <CheckCircle size={14} />{t.message}
          </div>
        ))}
      </div>
    </div>
  )
}

function ToolCard({ tool, onOpen }) {
  const favorites      = useStore(s => s.favorites)
  const toggleFavorite = useStore(s => s.toggleFavorite)
  const isFav = favorites.includes(tool.id)
  const Icon  = tool.icon
  const color = tool.iconColor || '#4f46e5'

  return (
    <div className="tool-card" onClick={onOpen}>
      <button
        className={`fav-btn ${isFav ? 'on' : ''}`}
        onClick={e => { e.stopPropagation(); toggleFavorite(tool.id) }}
        title={isFav ? 'Unfavorite' : 'Favorite'}
      >
        <Star size={12} fill={isFav ? 'currentColor' : 'none'} />
      </button>
      <div className="tool-card-icon" style={{ background: h2r(color, 0.1), color }}>
        <Icon size={18} />
      </div>
      <div className="tool-card-name">{tool.name}</div>
      <div className="tool-card-desc">{tool.description}</div>
    </div>
  )
}
