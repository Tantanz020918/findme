import { useState } from 'react'
import AppLayout from '../../shared/AppLayout'
import { useGameStore } from '../../../store/gameStore'

export default function Settings() {
  const clearAllData = useGameStore((s) => s.clearAllData)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <AppLayout title="设置">
      <div className="mt-8">
        {/* iOS-style grouped list */}
        <div className="mx-4 bg-white rounded-xl overflow-hidden">
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full px-4 py-3 text-center text-red-500 text-base active:bg-gray-100"
          >
            清除游戏数据
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-3 px-8">
          清除后将重置所有游戏进度，包括论坛登录状态和已恢复的帖子内容。
        </p>
      </div>

      {/* Confirm dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-[270px] overflow-hidden">
            <div className="px-4 pt-5 pb-4 text-center">
              <h3 className="text-base font-semibold text-gray-900">清除游戏数据</h3>
              <p className="text-sm text-gray-500 mt-1">确定要清除所有游戏数据吗？此操作不可撤销。</p>
            </div>
            <div className="border-t border-gray-200 flex">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 text-blue-500 text-base font-medium border-r border-gray-200 active:bg-gray-100"
              >
                取消
              </button>
              <button
                onClick={clearAllData}
                className="flex-1 py-3 text-red-500 text-base font-medium active:bg-gray-100"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
