import { useMemo } from 'react'
import useStore from '../store'
import { toolCategories, allTools } from '../utils/toolConfig'
import { Search, Star } from 'lucide-react'

export default function Sidebar() {
  const activeTool = useStore(s => s.activeTool)
  const setActiveTool = useStore(s => s.setActiveTool)
  const searchQuery = useStore(s => s.searchQuery)
  const setSearchQuery = useStore(s => s.setSearchQuery)
  const favorites = useStore(s => s.favorites)
  const toggleFavorite = useStore(s => s.toggleFavorite)
  const sidebarOpen = useStore(s => s.sidebarOpen)

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return toolCategories
    const q = searchQuery.toLowerCase()
    return toolCategories
      .map(cat => ({ ...cat, tools: cat.tools.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) }))
      .filter(cat => cat.tools.length > 0)
  }, [searchQuery])

  const favoriteTools = useMemo(() => allTools.filter(t => favorites.includes(t.id)), [favorites])

  if (!sidebarOpen) return null

  return (
    <aside className="sidebar">
      <div className="sidebar-search">
        <div className="sidebar-search-input">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search 24 tools..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="sidebar-scroll">
        {!searchQuery && favoriteTools.length > 0 && (
          <div className="sidebar-category">
            <div className="sidebar-category-label">⭐ Favorites</div>
            {favoriteTools.map(tool => (
              <ToolRow key={`fav-${tool.id}`} tool={tool} active={activeTool === tool.id} onClick={() => setActiveTool(tool.id)} onFav={() => toggleFavorite(tool.id)} isFav />
            ))}
          </div>
        )}
        {filteredCategories.map(cat => (
          <div key={cat.name} className="sidebar-category">
            <div className="sidebar-category-label">{cat.name}</div>
            {cat.tools.map(tool => (
              <ToolRow key={tool.id} tool={tool} active={activeTool === tool.id} onClick={() => setActiveTool(tool.id)} onFav={() => toggleFavorite(tool.id)} isFav={favorites.includes(tool.id)} />
            ))}
          </div>
        ))}
        {filteredCategories.length === 0 && (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-4)', fontSize: 14 }}>No tools match your search</div>
        )}
      </div>
    </aside>
  )
}

function ToolRow({ tool, active, onClick, onFav, isFav }) {
  const Icon = tool.icon
  return (
    <div className={`sidebar-tool ${active ? 'active' : ''}`} onClick={onClick}>
      <Icon size={18} className="sidebar-tool-icon" />
      <span className="sidebar-tool-name">{tool.name}</span>
      <button className={`sidebar-tool-fav ${isFav ? 'is-fav' : ''}`} onClick={e => { e.stopPropagation(); onFav() }}>
        <Star size={14} fill={isFav ? 'currentColor' : 'none'} />
      </button>
    </div>
  )
}
