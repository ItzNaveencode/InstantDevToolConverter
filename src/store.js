import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      activeTool: 'json-formatter',
      searchQuery: '',
      favorites: [],
      recentTools: [],
      sidebarOpen: true,
      toasts: [],
      darkMode: false,
      lastSmartInput: '',

      setActiveTool: (toolId) => set({ activeTool: toolId }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setLastSmartInput: (val) => set({ lastSmartInput: val }),
      toggleFavorite: (toolId) =>
        set((state) => ({
          favorites: state.favorites.includes(toolId)
            ? state.favorites.filter((id) => id !== toolId)
            : [...state.favorites, toolId],
        })),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleDarkMode: () => set((state) => {
        const nextMode = !state.darkMode;
        if (nextMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        return { darkMode: nextMode };
      }),
      addRecentTool: (toolId) => set((state) => {
        const filtered = state.recentTools.filter(id => id !== toolId);
        return { recentTools: [toolId, ...filtered].slice(0, 4) };
      }),

      showToast: (message) => {
        const id = Date.now()
        set((state) => ({ toasts: [...state.toasts, { id, message }] }))
        setTimeout(() => {
          set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }))
        }, 1500) // changed to 1.5s as requested
      },

      copyToClipboard: async (text) => {
        try {
          await navigator.clipboard.writeText(text)
          const { showToast } = useStore.getState()
          showToast('Copied ✓')
        } catch {
          // fallback
          const ta = document.createElement('textarea')
          ta.value = text
          document.body.appendChild(ta)
          ta.select()
          document.execCommand('copy')
          document.body.removeChild(ta)
          const { showToast } = useStore.getState()
          showToast('Copied ✓')
        }
      },
    }),
    {
      name: 'devforge-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        recentTools: state.recentTools,
        darkMode: state.darkMode,
        lastSmartInput: state.lastSmartInput,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.darkMode) {
          document.documentElement.classList.add('dark');
        }
      }
    }
  )
)

export default useStore
