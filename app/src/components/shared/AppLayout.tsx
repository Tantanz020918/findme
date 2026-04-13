import type { ReactNode } from 'react'
import { useGameStore } from '../../store/gameStore'

interface Props {
  title: string
  children: ReactNode
  rightAction?: ReactNode
  onBack?: () => void
}

export default function AppLayout({ title, children, rightAction, onBack }: Props) {
  const goHome = useGameStore((s) => s.goHome)
  const handleBack = onBack || goHome

  return (
    <div className="flex-1 flex flex-col bg-[#f2f2f7] overflow-hidden">
      <div className="relative flex items-center justify-between px-4 py-3 bg-[#f2f2f7] border-b border-gray-200/60">
        <button onClick={handleBack} className="text-[#007aff] text-[15px] flex items-center gap-0 z-10">
          <svg className="w-5 h-5 -mr-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          返回
        </button>
        <h1 className="absolute inset-x-0 text-center text-[17px] font-semibold text-black pointer-events-none">{title}</h1>
        <div className="z-10">{rightAction}</div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
