import { useGameStore } from '../../store/gameStore'

interface AppIcon {
  id: string
  name: string
  gradient: string
  icon: string
}

const apps: AppIcon[] = [
  { id: 'treehole', name: '树洞', gradient: 'from-emerald-400 to-green-600', icon: '🌳' },
  { id: 'schoolweb', name: '学校官网', gradient: 'from-blue-400 to-blue-600', icon: '🏫' },
  { id: 'wechat', name: '微信', gradient: 'from-green-400 to-green-500', icon: '💬' },
  { id: 'takeout', name: '外卖', gradient: 'from-yellow-400 to-orange-500', icon: '🍜' },
  { id: 'shopping', name: '购物', gradient: 'from-red-400 to-orange-500', icon: '🛒' },
  { id: 'settings', name: '设置', gradient: 'from-gray-300 to-gray-500', icon: '⚙️' },
]

export default function HomeScreen() {
  const openApp = useGameStore((s) => s.openApp)

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-sky-300 via-blue-400 to-indigo-500 px-5 pt-6 pb-4">
      {/* App grid */}
      <div className="grid grid-cols-4 gap-x-4 gap-y-5 mb-auto">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => openApp(app.id)}
            className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform duration-150"
          >
            <div className={`w-[58px] h-[58px] bg-gradient-to-br ${app.gradient} rounded-[14px] flex items-center justify-center text-[26px] shadow-lg shadow-black/20`}>
              {app.icon}
            </div>
            <span className="text-[11px] text-white font-medium drop-shadow-md leading-tight">
              {app.name}
            </span>
          </button>
        ))}
      </div>

      {/* Dock */}
      <div className="mt-6 mx-2 bg-white/20 backdrop-blur-xl rounded-[22px] px-6 py-3 flex justify-around">
        {['treehole', 'wechat', 'shopping'].map((id) => {
          const app = apps.find((a) => a.id === id)!
          return (
            <button
              key={id}
              onClick={() => openApp(id)}
              className="active:scale-90 transition-transform duration-150"
            >
              <div className={`w-[52px] h-[52px] bg-gradient-to-br ${app.gradient} rounded-[13px] flex items-center justify-center text-[24px] shadow-md shadow-black/15`}>
                {app.icon}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
