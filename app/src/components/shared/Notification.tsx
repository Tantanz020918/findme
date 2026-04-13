import { useEffect } from 'react'
import { useGameStore } from '../../store/gameStore'

export default function Notification() {
  const notification = useGameStore((s) => s.notification)
  const clearNotification = useGameStore((s) => s.clearNotification)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(clearNotification, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification, clearNotification])

  if (!notification) return null

  return (
    <div className="absolute top-12 left-4 right-4 z-[100] animate-slide-down">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm">💬</div>
        <p className="text-sm text-gray-800 flex-1">{notification}</p>
      </div>
    </div>
  )
}
