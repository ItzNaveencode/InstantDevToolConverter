import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      activeTool: 'json-formatter',
      searchQuery: '',
      favorites: [],
      sidebarOpen: true,
      toasts: [],

      setActiveTool: (toolId) => set({ activeTool: toolId }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      toggleFavorite: (toolId) =>
        set((state) => ({
          favorites: state.favorites.includes(toolId)
            ? state.favorites.filter((id) => id !== toolId)
            : [...state.favorites, toolId],
        })),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      showToast: (message) => {
        const id = Date.now()
        set((state) => ({ toasts: [...state.toasts, { id, message }] }))
        setTimeout(() => {
          set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }))
        }, 2200)
      },

      copyToClipboard: async (text) => {
        try {
          await navigator.clipboard.writeText(text)
          const { showToast } = useStore.getState()
          showToast('Copied to clipboard!')
        } catch {
          // fallback
          const ta = document.createElement('textarea')
          ta.value = text
          document.body.appendChild(ta)
          ta.select()
          document.execCommand('copy')
          document.body.removeChild(ta)
          const { showToast } = useStore.getState()
          showToast('Copied to clipboard!')
        }
      },
    }),
    {
      name: 'devforge-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        activeTool: state.activeTool,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
)

export default useStore
