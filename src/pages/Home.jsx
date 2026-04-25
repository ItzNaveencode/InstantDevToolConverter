import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, X, Copy, ExternalLink, Search, Star, ShieldCheck, Lock, Cpu, CheckCircle2, ClipboardPaste } from 'lucide-react'
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
  
  const isPopular = ['json-formatter', 'jwt-decoder', 'base64', 'url-encoder'].includes(tool.id)

  return (
    <Link to={`/${tool.id}`} className="tool-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <button
        className={`fav-btn ${isFav ? 'on' : ''}`}
        onClick={e => { e.preventDefault(); toggleFavorite(tool.id) }}
        title={isFav ? 'Unfavorite' : 'Favorite'}
      >
        <Star size={12} fill={isFav ? 'currentColor' : 'none'} />
      </button>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div className="tool-card-icon" style={{ background: h2r(color, 0.1), color }}>
          <Icon size={18} />
        </div>
        {isPopular && <div style={{ fontSize: 9, fontWeight: 700, color: '#fff', background: '#f97316', padding: '2px 6px', borderRadius: 4, letterSpacing: 0.5, textTransform: 'uppercase' }}>🔥 Most Used</div>}
      </div>
      <div className="tool-card-name" style={{ marginTop: 4 }}>{tool.name}</div>
      <div className="tool-card-desc">{tool.description}</div>
    </Link>
  )
}

export default function Home() {
  const favorites       = useStore(s => s.favorites)
  const recentTools     = useStore(s => s.recentTools)
  const copyToClipboard = useStore(s => s.copyToClipboard)
  const navigate        = useNavigate()

  const [search, setSearch]         = useState('')
  const [activeTab, setActiveTab]   = useState('All')
  const [smartInput, setSmartInput] = useState('')
  const [smartResult, setSmartResult] = useState(null)
  const [smartOutput, setSmartOutput] = useState('')
  const [isDetecting, setIsDetecting] = useState(false)
  const [copied, setCopied] = useState(false)
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
    if (!smartInput.trim()) {
      setSmartResult(null)
      setSmartOutput('')
      setIsDetecting(false)
      return
    }
    
    setIsDetecting(true)
    const timeoutId = setTimeout(() => {
      const result = detectInputType(smartInput)
      setSmartResult(result)
      if (result) {
        setSmartOutput(computeOutput(smartInput, result.label))
      } else {
        setSmartOutput('')
      }
      setIsDetecting(false)
    }, 150) // Micro-delay for "detecting" UX

    return () => clearTimeout(timeoutId)
  }, [smartInput])

  const handleCopy = () => {
    copyToClipboard(smartOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) setSmartInput(text)
    } catch (e) {
      console.error('Failed to read clipboard', e)
    }
  }

  const tabs = ['All', 'Favorites', ...toolCategories.map(c => c.name)]

  const getSections = () => {
    const q = search.toLowerCase().trim()
    let baseSections = []
    
    if (activeTab === 'Favorites') {
      const tools = allTools.filter(t => favorites.includes(t.id))
        .filter(t => !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
      baseSections.push({ name: 'Favorites', color: '#4f46e5', tools })
      return baseSections
    }
    
    if (activeTab !== 'All') {
      const cat = toolCategories.find(c => c.name === activeTab)
      if (cat) {
        baseSections.push({ ...cat, tools: cat.tools.filter(t => !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) })
      }
      return baseSections
    }
    
    if (q) {
      const tools = allTools.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
      return [{ name: `"${search}"`, color: '#4f46e5', tools }]
    }
    
    // Default "All" view with Recent Tools at the top
    if (recentTools && recentTools.length > 0) {
      const recent = recentTools.map(id => allTools.find(t => t.id === id)).filter(Boolean)
      if (recent.length > 0) {
        baseSections.push({ name: '🧠 Recently Used Tools', color: 'var(--brand)', tools: recent })
      }
    }
    return [...baseSections, ...toolCategories]
  }

  const sections = getSections()

  const getActionHint = (label) => {
    if (label === 'JSON') return 'Ready to format'
    if (label === 'JWT Token') return 'Decoded instantly'
    if (label === 'Base64') return 'Decoded instantly'
    if (label === 'Hex Color') return 'Converted instantly'
    return 'Preview below'
  }

  return (
    <main className="home">
      <div className="page-container">

        {/* ── HERO ── */}
        <div className="hero-card" style={{ padding: '40px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="hero-badge" style={{ marginBottom: 24 }}>
            <span className="hero-dot" />
            {allTools.length} tools · 100% free · works offline
          </div>
          <h1 style={{ fontSize: 36, marginBottom: 16 }}>Paste anything. Get instant results.</h1>
          <p style={{ fontSize: 16, maxWidth: 600, margin: '0 auto', marginBottom: 8, color: 'var(--t2)' }}>
            Automatically detect JSON, JWT, Base64, URLs and more — instantly.
          </p>
          <p style={{ fontSize: 18, fontWeight: 500, color: 'var(--brand)', marginBottom: 32 }}>
            Stop switching tools. Just paste.
          </p>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--t2)', fontWeight: 500 }}><Cpu size={14} color="var(--brand)" /> Runs locally</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--t2)', fontWeight: 500 }}><Lock size={14} color="var(--brand)" /> No data stored</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--t2)', fontWeight: 500 }}><ShieldCheck size={14} color="var(--brand)" /> No signup required</div>
          </div>

          {/* Smart input demo-like block */}
          <div style={{ width: '100%', maxWidth: 800, textAlign: 'left' }}>
            <div className={`smart-input-wrap ${smartResult ? 'has-result' : ''} ${isDetecting ? 'detecting' : ''}`} style={{ transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', padding: 20 }}>
              <div className="smart-input-icon" style={{ marginTop: 4 }}>
                <Zap size={20} className={isDetecting ? 'pulse-anim' : ''} />
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <textarea
                  ref={inputRef}
                  className="smart-input"
                  placeholder="Paste JSON, JWT, Base64, URL… we'll detect it instantly"
                  value={smartInput}
                  onChange={e => setSmartInput(e.target.value)}
                  rows={smartResult ? 2 : 3}
                  spellCheck={false}
                  style={{ fontSize: 15, paddingRight: 40 }}
                />
                {!smartInput && (
                  <div style={{ position: 'absolute', right: 0, bottom: 4 }}>
                    <button className="btn sm ghost" onClick={handlePaste} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, color: 'var(--t3)' }}>
                      <ClipboardPaste size={14} /> Paste from clipboard
                    </button>
                  </div>
                )}
                {isDetecting && (
                  <div style={{ position: 'absolute', right: 0, bottom: -10, fontSize: 12, color: 'var(--brand)', fontWeight: 600, animation: 'fadeIn 0.2s' }}>
                    Detecting...
                  </div>
                )}
              </div>
              {smartInput && !isDetecting && (
                <button className="smart-clear" onClick={() => { setSmartInput(''); setSmartResult(null); setSmartOutput(''); }} style={{ top: 18, right: 18, background: 'var(--card)' }} title="Clear input">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* ── SPLIT RESULT PANEL ── */}
            <div style={{ height: smartResult && !isDetecting ? 'auto' : 0, overflow: 'hidden', transition: 'height 0.3s ease' }}>
              {smartResult && !isDetecting && (
                <div className="smart-panel" style={{ marginTop: 16 }}>
                  {/* Panel header */}
                  <div className="smart-panel-header" style={{ padding: '12px 20px' }}>
                    <div className="smart-panel-detected" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, background: `${smartResult.color}15`, color: smartResult.color, padding: '4px 12px', borderRadius: 999, fontSize: 13, fontWeight: 600 }}>
                        <span className="smart-panel-dot" style={{ background: smartResult.color }} />
                        🔍 Detected: {smartResult.label}
                      </span>
                      <span className="smart-panel-arrow">→</span>
                      <span className="smart-panel-action" style={{ fontWeight: 600, color: 'var(--t1)', fontSize: 13 }}>{getActionHint(smartResult.label)}</span>
                    </div>
                    <div style={{display:'flex',gap:8}}>
                      <button
                        className="btn sm"
                        onClick={handleCopy}
                        title="Copy output"
                        style={{ minWidth: 100, justifyContent: 'center' }}
                      >
                        {copied ? <><CheckCircle2 size={12} color="#16a34a" /> Copied ✓</> : <><Copy size={12} /> Copy result</>}
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
                  <div className="smart-panel-split" style={{ animation: 'fadeIn 0.3s ease' }}>
                    {/* INPUT pane */}
                    <div className="smart-pane" style={{ background: 'var(--hov)' }}>
                      <div className="smart-pane-label" style={{ background: 'var(--inp)' }}>RAW INPUT</div>
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
                    <div className="smart-pane" style={{ background: 'var(--card)' }}>
                      <div className="smart-pane-label" style={{color: smartResult.color, background: 'var(--inp)'}}>
                        DECODED OUTPUT
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
            </div>

            {/* Example chips (only when empty) */}
            {!smartInput && (
              <div className="smart-shortcuts" style={{ justifyContent: 'center', marginTop: 24 }}>
                <span style={{ fontSize: 13, color: 'var(--t3)', marginRight: 8, display: 'flex', alignItems: 'center' }}>Try an example:</span>
                {[
                  { label: 'JSON',      val: '{"name":"InstantDevToolConverter","version":"2.0","tools":24}' },
                  { label: 'JWT',       val: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' },
                  { label: 'URL',       val: 'https://api.example.com/v2/users?page=1&limit=20' },
                  { label: 'Timestamp', val: '1714003200' },
                  { label: 'Hex color', val: '#6366f1' },
                ].map(ex => (
                  <button key={ex.label} className="smart-example" onClick={() => setSmartInput(ex.val)}>
                    {ex.label}
                  </button>
                ))}
              </div>
            )}
          </div>
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
              <span className="category-head-title" style={{ color: group.name.includes('Recently') ? 'var(--brand)' : 'var(--t1)' }}>{group.name}</span>
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
        
        {/* TRUST FOOTER */}
        <div style={{ textAlign: 'center', padding: '60px 0 40px', color: 'var(--t3)', fontSize: 13 }}>
           <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginBottom: 16 }}>
             <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle2 size={14} color="var(--brand)" /> Works completely in your browser</span>
             <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle2 size={14} color="var(--brand)" /> No data sent to servers</span>
             <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle2 size={14} color="var(--brand)" /> Fast and private</span>
           </div>
           <p>© {new Date().getFullYear()} InstantConverters. Built for developers.</p>
        </div>

      </div>
    </main>
  )
}
