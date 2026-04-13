import { useState } from 'react'
import AppLayout from '../../shared/AppLayout'
import SpriteImage from '../../shared/SpriteImage'
import type { SpriteIndex } from '../../shared/SpriteImage'

type View = 'home' | 'orders'

interface FoodItem {
  id: string
  name: string
  shop: string
  price: string
  spriteIndex: SpriteIndex
  tag?: string
}

const recommended: FoodItem[] = [
  { id: 'r1', name: '桂花乌龙（大杯）', shop: '茶语时光', price: '¥18', spriteIndex: 0, tag: '月售500+' },
  { id: 'r2', name: '麻辣烫（大份）', shop: '张亮麻辣烫', price: '¥28', spriteIndex: 1, tag: '好评如潮' },
  { id: 'r3', name: '黄焖鸡米饭', shop: '杨铭宇黄焖鸡', price: '¥22', spriteIndex: 2 },
  { id: 'r4', name: '冰美式', shop: 'Campus Coffee', price: '¥12', spriteIndex: 3 },
  { id: 'r5', name: '鸡排饭套餐', shop: '正新鸡排', price: '¥20', spriteIndex: 4 },
  { id: 'r6', name: '柠檬水', shop: '茶语时光', price: '¥8', spriteIndex: 5 },
  { id: 'r7', name: '番茄鸡蛋面', shop: '家常味道', price: '¥14', spriteIndex: 6 },
]

interface OrderItem {
  id: string
  name: string
  shop: string
  price: string
  time: string
  spriteIndex: SpriteIndex
}

const orders: OrderItem[] = [
  { id: 'o1', name: '桂花乌龙（大杯）', shop: '茶语时光', price: '¥18', time: '9月5日 15:20', spriteIndex: 0 },
  { id: 'o2', name: '黄焖鸡米饭+米饭', shop: '杨铭宇黄焖鸡', price: '¥22', time: '9月5日 11:45', spriteIndex: 2 },
  { id: 'o3', name: '鸡排饭套餐', shop: '正新鸡排', price: '¥20', time: '9月4日 12:00', spriteIndex: 4 },
  { id: 'o4', name: '桂花乌龙（大杯）', shop: '茶语时光', price: '¥18', time: '9月4日 14:30', spriteIndex: 0 },
  { id: 'o5', name: '麻辣烫（大份）', shop: '张亮麻辣烫', price: '¥28', time: '9月3日 18:20', spriteIndex: 1 },
  { id: 'o6', name: '番茄鸡蛋面', shop: '家常味道', price: '¥14', time: '9月3日 11:30', spriteIndex: 6 },
  { id: 'o7', name: '冰美式', shop: 'Campus Coffee', price: '¥12', time: '9月2日 15:00', spriteIndex: 3 },
  { id: 'o8', name: '桂花乌龙（大杯）', shop: '茶语时光', price: '¥18', time: '9月2日 09:30', spriteIndex: 0 },
  { id: 'o9', name: '麻辣烫（中份）', shop: '张亮麻辣烫', price: '¥22', time: '9月1日 12:10', spriteIndex: 1 },
  { id: 'o10', name: '柠檬水', shop: '茶语时光', price: '¥8', time: '8月31日 16:00', spriteIndex: 5 },
  { id: 'o11', name: '黄焖鸡米饭', shop: '杨铭宇黄焖鸡', price: '¥22', time: '8月30日 12:15', spriteIndex: 2 },
  { id: 'o12', name: '桂花乌龙（大杯）', shop: '茶语时光', price: '¥18', time: '8月29日 15:30', spriteIndex: 0 },
]

export default function Takeout() {
  const [view, setView] = useState<View>('home')

  if (view === 'orders') {
    return (
      <AppLayout title="我的订单" onBack={() => setView('home')}>
        <div className="divide-y divide-gray-100">
          {orders.map((order) => (
            <div key={order.id} className="px-5 py-3.5 flex items-center gap-3">
              <SpriteImage index={order.spriteIndex} className="w-14 h-14 rounded-xl shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-black truncate">{order.name}</p>
                <p className="text-[12px] text-gray-400">{order.shop} · {order.time}</p>
              </div>
              <span className="text-[15px] font-semibold text-black">{order.price}</span>
            </div>
          ))}
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout
      title="外卖"
      rightAction={
        <button onClick={() => setView('orders')} className="text-[#007aff] text-[14px]">订单</button>
      }
    >
      {/* Search bar */}
      <div className="px-4 pt-3 pb-2">
        <div className="bg-white rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="text-[14px] text-gray-400">搜索美食、饮品</span>
        </div>
      </div>

      {/* Banner */}
      <div className="px-4 pb-3">
        <div className="bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl p-4 shadow-sm">
          <p className="text-white font-bold text-[17px]">新学期开学特惠</p>
          <p className="text-white/80 text-[13px] mt-0.5">满20减5，新用户首单立减</p>
        </div>
      </div>

      {/* Recommended */}
      <div className="px-4 pb-2">
        <h3 className="text-[15px] font-semibold text-black mb-3">为你推荐</h3>
        <div className="space-y-2.5">
          {recommended.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-3.5 shadow-sm flex items-center gap-3">
              <SpriteImage index={item.spriteIndex} className="w-16 h-16 rounded-xl shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-black truncate">{item.name}</p>
                <p className="text-[12px] text-gray-400 mt-0.5">{item.shop}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[15px] font-bold text-orange-500">{item.price}</span>
                  {item.tag && <span className="text-[10px] bg-orange-50 text-orange-500 px-1.5 py-0.5 rounded-full">{item.tag}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
