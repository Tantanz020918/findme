import type { ReactNode } from 'react'
import StatusBar from './StatusBar'

interface Props {
  children: ReactNode
}

export default function PhoneFrame({ children }: Props) {
  return (
    <div className="h-full w-full flex items-center justify-center bg-black">
      {/* Large screen: show phone frame */}
      <div className="
        hidden min-[501px]:flex
        flex-col
        w-[375px] h-[812px]
        bg-white
        rounded-[44px]
        overflow-hidden
        border-[3px] border-gray-700
        shadow-2xl
        relative
      ">
        <StatusBar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
        {/* Home indicator */}
        <div className="flex justify-center pb-2 pt-1 bg-white">
          <div className="w-32 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>

      {/* Small screen: no frame, full screen */}
      <div className="
        flex min-[501px]:hidden
        flex-col
        w-full h-full
        bg-white
        relative
      ">
        <StatusBar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
        <div className="flex justify-center pb-1 bg-white safe-area-bottom">
          <div className="w-32 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  )
}
