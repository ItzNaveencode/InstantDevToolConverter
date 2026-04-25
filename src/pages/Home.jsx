import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, X, Copy, ExternalLink, Search, Star } from 'lucide-react'
import useStore from '../store'
import { toolCategories, allTools } from '../utils/toolConfig'
import { detectInputType, computeOutput } from '../utils/smartLogic'

/* hex → rgba for tool card backgrounds */
const h2r = (hex, a = 0.1) => {
  const safe = hex.startsWith('#') && hex.length >= 7 ? hex : '#4f46e5'
  const r = parseInt(safe.slice(1,3),16)
  const g = parseInt(safe.slice(3,5),16)
  const b = parseInt(safe.slice(5,7),16)
  return `rgba(${r},${g},${b},${a})`
}

function ToolCard({ tool }) {
  const favorites      = useStore(s => s.favorites)
  const toggleFavorite = useStore(s => s.toggleFavorite)
  const isFav = favorites.includes(tool.id)
  const Icon  = tool.icon
  const color = tool.iconColor || '#4f46e5'

  return (
    <Link to={`/${tool.id}`} className="tool-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <button
        className={`fav-btn ${isFav ? 'on' : ''}`}
        onClick={e => { e.preventDefault(); toggleFavorite(tool.id) }}
        title={isFav ? 'Unfavorite' : 'Favorite'}
      >
        <Star size={12} fill={isFav ? 'currentColor' : 'none'} />
      </button>
      <div className="tool-card-icon" style={{ background: h2r(color, 0.1), color }}>
        <Icon size={18} />
      </div>
      <div className="tool-card-name">{tool.name}</div>
      <div className="tool-card-desc">{tool.description}</div>
    </Link>
  )
}

export default function Home() {
  const toasts          = useStore(s => s.toasts)
  const favorites       = useStore(s => s.favorites)
  const copyToClipboard = useStore(s => s.copyToClipboard)
  const navigate        = useNavigate()

  const [search, setSearch]         = useState('')
  const [activeTab, setActiveTab]   = useState('All')
  const [smartInput, setSmartInput] = useState('')
  const [smartResult, setSmartResult] = useState(null)
  const [smartOutput, setSmartOutput] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    document.title = "InstantDevToolConverter — 24 Free Developer Tools"
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

  const tabs = ['All', 'Favorites', ...toolCategories.map(c => c.name)]

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

  const sections = getSections()

  return (
    <main className="home">
      <div className="page-container">

        {/* ── HERO ── */}
        <div className="hero-card">
          <div className="hero-badge">
            <span className="hero-dot" />
            {allTools.length} tools · 100% free · no signup · works offline
          </div>
          <h1>Paste anything. Get instant results.</h1>
          <p>Automatically detect and convert JSON, JWT, Base64, URLs and more — instantly.</p>

          <div style={{ marginTop: 24, textAlign: 'left', background: 'var(--inp)', padding: 16, borderRadius: 8, border: '1px solid var(--bdr)' }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Smart Input Detection</h2>
            <p style={{ fontSize: 13, color: 'var(--t3)', lineHeight: 1.5, margin: 0 }}>
              Paste anything — JSON, JWT, URLs — and the app automatically detects and processes it instantly without manual selection.
            </p>
          </div>

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
                    onClick={() => navigate(`/${smartResult.toolId}`)}
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
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </div>
        ))}

      </div>
    </main>
  )
}
