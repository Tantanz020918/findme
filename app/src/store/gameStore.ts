import { create } from 'zustand'

interface GameState {
  treeholeLoggedIn: boolean
  adminChatUnlocked: boolean
  postRestored: boolean
  currentApp: string | null
  notification: string | null

  login: () => void
  unlockAdminChat: () => void
  restorePost: () => void
  openApp: (app: string) => void
  goHome: () => void
  showNotification: (msg: string) => void
  clearNotification: () => void
  clearAllData: () => void
}

const loadState = () => ({
  treeholeLoggedIn: localStorage.getItem('treehole_logged_in') === 'true',
  adminChatUnlocked: localStorage.getItem('admin_chat_unlocked') === 'true',
  postRestored: localStorage.getItem('post_restored') === 'true',
})

export const useGameStore = create<GameState>((set) => ({
  ...loadState(),
  currentApp: null,
  notification: null,

  login: () => {
    localStorage.setItem('treehole_logged_in', 'true')
    set({ treeholeLoggedIn: true })
  },
  unlockAdminChat: () => {
    localStorage.setItem('admin_chat_unlocked', 'true')
    set({ adminChatUnlocked: true })
  },
  restorePost: () => {
    localStorage.setItem('post_restored', 'true')
    set({ postRestored: true })
  },
  openApp: (app) => set({ currentApp: app }),
  goHome: () => set({ currentApp: null }),
  showNotification: (msg) => set({ notification: msg }),
  clearNotification: () => set({ notification: null }),
  clearAllData: () => {
    localStorage.removeItem('treehole_logged_in')
    localStorage.removeItem('admin_chat_unlocked')
    localStorage.removeItem('post_restored')
    localStorage.removeItem('intro_seen')
    window.location.reload()
  },
}))
