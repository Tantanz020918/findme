import { useState } from 'react'

interface Props {
  src: string
  exifData?: Record<string, string>
  onClose: () => void
}

export default function ImageViewer({ src, exifData, onClose }: Props) {
  const [showExif, setShowExif] = useState(false)

  return (
    <div className="absolute inset-0 z-50 bg-black/90 flex flex-col" onClick={onClose}>
      <div className="flex-1 flex items-center justify-center p-4">
        <img
          src={src}
          alt=""
          className="max-w-full max-h-full object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>

      <div className="p-4 pb-8 flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setShowExif(!showExif)}
          className="bg-white/20 text-white px-5 py-2.5 rounded-full text-[14px] backdrop-blur-sm active:bg-white/30"
        >
          {showExif ? '收起 EXIF' : '解析 EXIF'}
        </button>

        {showExif && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 w-full max-w-[320px]">
            {exifData ? (
              <div className="space-y-2">
                {Object.entries(exifData).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-[13px]">
                    <span className="text-gray-400">{key}</span>
                    <span className="text-white font-mono">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-[13px] text-center">无有效信息</p>
            )}
          </div>
        )}

        <button
          onClick={onClose}
          className="text-white/60 text-[14px] mt-1"
        >
          关闭
        </button>
      </div>
    </div>
  )
}
