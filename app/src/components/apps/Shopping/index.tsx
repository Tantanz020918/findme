import { useState } from 'react'
import AppLayout from '../../shared/AppLayout'
import ImageViewer from '../../shared/ImageViewer'
import SpriteImage from '../../shared/SpriteImage'
import type { SpriteIndex } from '../../shared/SpriteImage'

type Tab = 'home' | 'cart' | 'address'

interface Product {
  id: string
  name: string
  price: string
  spriteIndex?: SpriteIndex
  sales?: string
}

const recommended: Product[] = [
  { id: 'p1', name: '简约圆形小表盘手表 浅色真皮表带', price: '¥299', spriteIndex: 7, sales: '月销200+' },
  { id: 'p2', name: 'ins风桌面收纳盒 多格分类整理', price: '¥25.9', spriteIndex: 10, sales: '月销1.2万' },
  { id: 'p3', name: '蓝月亮洗衣液 薰衣草香 2kg装', price: '¥39.9', spriteIndex: 8, sales: '月销5万+' },
  { id: 'p4', name: 'Type-C快充数据线 1.5米 编织线', price: '¥19.9', spriteIndex: 9, sales: '月销8000+' },
  { id: 'p5', name: '透明手机壳 防摔气囊 全包边', price: '¥15.8', spriteIndex: 11, sales: '月销3万+' },
  { id: 'p6', name: '不锈钢衣架 加粗防滑 10只装', price: '¥12.9' },
  { id: 'p7', name: '宿舍床帘 遮光 少女心 ins风', price: '¥49.9' },
  { id: 'p8', name: '折叠小风扇 USB充电 静音', price: '¥29.9' },
  { id: 'p9', name: '护眼台灯 LED 三档调光', price: '¥59.9' },
]

interface CartItem {
  id: string
  name: string
  price: string
  spriteIndex?: SpriteIndex
}

const cartItems: CartItem[] = [
  { id: 'c1', name: '简约圆形小表盘手表 浅色真皮表带', price: '¥299', spriteIndex: 7 },
  { id: 'c2', name: '蓝月亮洗衣液 薰衣草香 2kg', price: '¥39.9', spriteIndex: 8 },
  { id: 'c3', name: 'Type-C数据线 1.5米 快充', price: '¥19.9', spriteIndex: 9 },
  { id: 'c4', name: '透明手机壳 iPhone 13 mini', price: '¥15.8', spriteIndex: 11 },
  { id: 'c5', name: '桌面收纳盒 多格分类', price: '¥25.9', spriteIndex: 10 },
]

const addresses = [
  { id: 'a1', name: '林晓', phone: '138****8816', address: 'XX大学9号楼302', tag: '学校' },
  { id: 'a2', name: '林晓', phone: '138****8816', address: '桃源市长安区桃花路88号幸福小区3栋1单元402', tag: '家' },
  { id: 'a3', name: '张宇', phone: '159****3307', address: 'XX大学10号楼315', tag: '' },
  { id: 'a4', name: '王佳琪', phone: '136****2201', address: '明珠市海淀区学府路12号阳光花园2栋503', tag: '' },
  { id: 'a5', name: '周雨彤', phone: '187****6654', address: 'XX大学9号楼301', tag: '' },
]

export default function Shopping() {
  const [tab, setTab] = useState<Tab>('home')
  const [viewingImage, setViewingImage] = useState<{ src: string; exif?: Record<string, string> } | null>(null)

  return (
    <AppLayout title="购物">
      {/* Tab bar */}
      <div className="flex bg-white border-b border-gray-200/60">
        {([['home', '推荐'], ['cart', '购物车'], ['address', '地址']] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 py-3 text-[14px] font-medium relative ${tab === key ? 'text-orange-500' : 'text-gray-400'}`}
          >
            {label}
            {tab === key && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.75 bg-orange-500 rounded-full" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === 'home' && (
          <div className="p-4">
            <div className="bg-white rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm mb-4">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span className="text-[14px] text-gray-400">搜索商品</span>
            </div>

            <div className="bg-gradient-to-r from-red-400 to-orange-400 rounded-2xl p-4 shadow-sm mb-4">
              <p className="text-white font-bold text-[17px]">开学季特惠</p>
              <p className="text-white/80 text-[13px] mt-0.5">宿舍好物低至5折</p>
            </div>

            <h3 className="text-[15px] font-semibold text-black mb-3">猜你喜欢</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {recommended.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <div className="w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                    {item.spriteIndex !== undefined ? (
                      <SpriteImage index={item.spriteIndex} className="w-full h-full" />
                    ) : <span className="text-3xl">📦</span>}
                  </div>
                  <div className="p-2.5">
                    <p className="text-[13px] text-black line-clamp-2 leading-snug">{item.name}</p>
                    <div className="flex items-baseline gap-1.5 mt-1.5">
                      <span className="text-[15px] font-bold text-orange-500">{item.price}</span>
                      {item.sales && <span className="text-[10px] text-gray-400">{item.sales}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'cart' && (
          <div className="p-4 space-y-2.5">
            {cartItems.map((item) => (
              <div key={item.id} className="rounded-2xl p-3.5 flex items-center gap-3 shadow-sm bg-white">
                <div className="shrink-0 overflow-hidden rounded-xl" style={{ width: '72px', height: '72px' }}>
                  {item.spriteIndex !== undefined ? (
                    <SpriteImage index={item.spriteIndex} className="w-full h-full" />
                  ) : <div className="w-full h-full bg-gray-100 flex items-center justify-center text-2xl">📦</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-black leading-snug line-clamp-2">{item.name}</p>
                  <p className="text-[15px] font-bold text-orange-500 mt-1.5">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'address' && (
          <div className="p-4 space-y-3">
            {addresses.map((addr) => (
              <div key={addr.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[15px] font-semibold text-black">{addr.name}</span>
                  <span className="text-[14px] text-gray-500">{addr.phone}</span>
                  {addr.tag && <span className="text-[11px] bg-orange-50 text-orange-500 px-2 py-0.5 rounded-full font-medium">{addr.tag}</span>}
                </div>
                <p className="text-[14px] text-gray-600 leading-relaxed">{addr.address}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {viewingImage && <ImageViewer src={viewingImage.src} onClose={() => setViewingImage(null)} />}
    </AppLayout>
  )
}
