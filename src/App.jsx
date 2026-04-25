import { Routes, Route, Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import useStore from './store'
import { allTools } from './utils/toolConfig'
import Home from './pages/Home'

// We will dynamically import the generated page components using Vite's glob import
const pages = import.meta.glob('./pages/*Page.jsx', { eager: true })

function getPageComponent(toolId) {
  const componentName = toolId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Page'
  const path = `./pages/${componentName}.jsx`
  return pages[path]?.default
}

export default function App() {
  const toasts = useStore(s => s.toasts)

  return (
    <div className="app">
      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <Link className="navbar-logo" to="/" style={{ textDecoration: 'none' }}>
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
        </Link>
        <div className="navbar-spacer" />
      </nav>

      {/* ── ROUTING ── */}
      <Routes>
        <Route path="/" element={<Home />} />
        {allTools.map(tool => {
          const PageComp = getPageComponent(tool.id)
          return PageComp ? <Route key={tool.id} path={`/${tool.id}`} element={<PageComp />} /> : null
        })}
      </Routes>

      {/* ── TOASTS ── */}
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
