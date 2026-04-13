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

function App() {
  return (
    <PhoneFrame>
      <Notification />
      <AppContent />
    </PhoneFrame>
  )
}

export default App
