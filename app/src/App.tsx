import { useState, useEffect } from 'react'
import PhoneFrame from './components/Phone/PhoneFrame'
import HomeScreen from './components/Phone/HomeScreen'
import Notification from './components/shared/Notification'
import TreeHole from './components/apps/TreeHole'
import WeChat from './components/apps/WeChat'
import SchoolWeb from './components/apps/SchoolWeb'
import Takeout from './components/apps/Takeout'
import Shopping from './components/apps/Shopping'
import Settings from './components/apps/Settings'
import { useGameStore } from './store/gameStore'

function AppContent() {
  const currentApp = useGameStore((s) => s.currentApp)

  switch (currentApp) {
    case 'treehole': return <TreeHole />
    case 'wechat': return <WeChat />
    case 'schoolweb': return <SchoolWeb />
    case 'takeout': return <Takeout />
    case 'shopping': return <Shopping />
    case 'settings': return <Settings />
    default: return <HomeScreen />
  }
}

function IntroDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-[100] bg-black/50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl w-full max-w-[300px] overflow-hidden">
        <div className="px-5 pt-6 pb-4 text-center">
          <div className="text-3xl mb-3">🔍</div>
          <h2 className="text-[17px] font-bold text-black mb-3">神秘爆料贴</h2>
          <p className="text-[14px] text-gray-600 leading-relaxed">
            校园论坛「树洞」出现了一条神秘帖子，声称掌握了某人的私密照片。
          </p>
          <p className="text-[14px] text-gray-600 leading-relaxed mt-2">
            你的任务是：
          </p>
          <div className="mt-3 text-left bg-[#f2f2f7] rounded-xl p-3">
            <p className="text-[14px] text-gray-800">1. 找出帖子中的受害者是谁</p>
            <p className="text-[14px] text-gray-800 mt-1">2. 破解发帖人的身份信息</p>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3.5 text-[#007aff] text-[16px] font-semibold active:bg-gray-100"
          >
            开始调查
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [showIntro, setShowIntro] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('intro_seen')
    if (!seen) {
      setShowIntro(true)
    }
  }, [])

  const handleCloseIntro = () => {
    localStorage.setItem('intro_seen', 'true')
    setShowIntro(false)
  }

  return (
    <PhoneFrame>
      <Notification />
      <AppContent />
      {showIntro && <IntroDialog onClose={handleCloseIntro} />}
    </PhoneFrame>
  )
}

export default App
