import { useState, useRef, useEffect } from 'react'
import AppLayout from '../../shared/AppLayout'
import { useGameStore } from '../../../store/gameStore'
import { chats, moments, ADMIN_CORRECT_ANSWER } from '../../../data/wechat'
import type { ChatMessage } from '../../../data/wechat'
import ImageViewer from '../../shared/ImageViewer'

type View = 'chatList' | 'chat' | 'moments'

export default function WeChat() {
  const { adminChatUnlocked, postRestored, restorePost } = useGameStore()
  const [view, setView] = useState<View>('chatList')
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [adminMessages, setAdminMessages] = useState<ChatMessage[]>([
    { id: 'a0', sender: 'other', content: '你好，需要数据恢复服务请按以下格式发送信息：\n\n发帖人姓名，发帖地点，发帖年份\n\n例如：张三，北京市，2025\n\n三项信息全部正确后我会帮你恢复数据。', time: '' },
  ])
  const [inputText, setInputText] = useState('')
  const [viewingImage, setViewingImage] = useState<{ src: string; exif?: Record<string, string> } | null>(null)

  const handleAdminSend = () => {
    if (!inputText.trim()) return
    const newMsg: ChatMessage = { id: `u${Date.now()}`, sender: 'me', content: inputText.trim() }
    setAdminMessages((prev) => [...prev, newMsg])
    setInputText('')

    const parts = inputText.trim().split(/[，,]/).map((s) => s.trim())
    setTimeout(() => {
      if (
        parts.length === 3 &&
        parts[0] === ADMIN_CORRECT_ANSWER.name &&
        parts[1] === ADMIN_CORRECT_ANSWER.location &&
        parts[2] === ADMIN_CORRECT_ANSWER.year
      ) {
        restorePost()
        setAdminMessages((prev) => [
          ...prev,
          {
            id: `r${Date.now()}`,
            sender: 'other',
            content: '信息匹配成功！数据已恢复。请返回树洞查看帖子内容。',
          },
        ])
      } else {
        setAdminMessages((prev) => [
          ...prev,
          {
            id: `r${Date.now()}`,
            sender: 'other',
            content: '信息不匹配，无法定位数据，请确认后重试。',
          },
        ])
      }
    }, 800)
  }

  // Chat list
  if (view === 'chatList') {
    const allChats = adminChatUnlocked
      ? [{ id: 'admin', name: '论坛管理员', avatar: '🔧', lastMessage: '数据恢复服务', messages: [] }, ...chats]
      : chats

    return (
      <AppLayout
        title="微信"
        rightAction={
          <button onClick={() => setView('moments')} className="text-blue-500 text-sm">
            朋友圈
          </button>
        }
      >
        <div className="divide-y divide-gray-100">
          {allChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => { setSelectedChat(chat.id); setView('chat') }}
              className="w-full px-4 py-3 flex items-center gap-3 active:bg-gray-50"
            >
              <div className="w-11 h-11 bg-gray-200 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                {chat.avatar}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-gray-900 truncate">{chat.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {(() => {
                    const msgs = chat.id === 'admin' ? adminMessages : chat.messages
                    if (!msgs || msgs.length === 0) return chat.lastMessage
                    const last = msgs[msgs.length - 1]
                    const prefix = last.senderName ? `${last.senderName}：` : ''
                    return last.sender === 'me' ? `我：${last.content}` : `${prefix}${last.content}`
                  })()}
                </p>
              </div>
            </button>
          ))}
        </div>
      </AppLayout>
    )
  }

  // Moments view
  if (view === 'moments') {
    return (
      <AppLayout title="朋友圈" onBack={() => setView('chatList')}>
        <div className="divide-y divide-gray-100">
          {moments.map((post) => (
            <div key={post.id} className="px-4 py-3">
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 bg-gray-200 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                  {post.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-600">{post.author}</p>
                  <p className="text-sm text-gray-800 mt-0.5 whitespace-pre-line">{post.content}</p>
                  {post.images && (
                    <div className="flex gap-1 mt-2">
                      {post.images.map((img, i) => (
                        <div
                          key={i}
                          className="w-20 h-20 bg-gray-200 rounded cursor-pointer overflow-hidden"
                          onClick={() => setViewingImage({ src: img })}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-400">{post.time}</span>
                    {post.location && <span className="text-[10px] text-gray-400">📍{post.location}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {viewingImage && (
          <ImageViewer src={viewingImage.src} exifData={viewingImage.exif} onClose={() => setViewingImage(null)} />
        )}
      </AppLayout>
    )
  }

  // Chat detail
  if (view === 'chat' && selectedChat) {
    const isAdmin = selectedChat === 'admin'
    const chat = isAdmin ? null : chats.find((c) => c.id === selectedChat)
    const chatName = isAdmin ? '论坛管理员' : chat?.name || ''
    const messages = isAdmin ? adminMessages : chat?.messages || []
    const isGroup = chat?.isGroup || false
    const chatAvatar = isAdmin ? '🔧' : chat?.avatar || '👤'

    // Parse time string like "9月2日 12:30" or "8月30日 09:00" into comparable minutes
    const parseTime = (time?: string): number => {
      if (!time) return -1
      const match = time.match(/(\d+)月(\d+)日\s*(\d+):(\d+)/)
      if (!match) return -1
      const [, month, day, hour, minute] = match.map(Number)
      return month * 44640 + day * 1440 + hour * 60 + minute
    }

    const shouldShowTime = (idx: number): boolean => {
      if (idx === 0) return true
      const curr = parseTime(messages[idx].time)
      const prev = parseTime(messages[idx - 1].time)
      if (curr === -1 || prev === -1) return !!messages[idx].time
      return curr - prev >= 10 // 10 minutes gap
    }

    const ChatMessages = () => {
      const scrollRef = useRef<HTMLDivElement>(null)
      useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
      }, [messages.length])
      return (
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 bg-[#ededed] flex flex-col">
          <div className="space-y-3">
            {messages.map((msg, idx) => {
              const isMine = msg.sender === 'me'
              const avatar = isMine ? '👩' : (msg.senderAvatar || chatAvatar)
              const name = msg.senderName || (isMine ? '林晓' : chatName)
              const showTime = shouldShowTime(idx)

              return (
                <div key={msg.id}>
                  {showTime && msg.time && (
                    <div className="text-center text-[11px] text-gray-400 py-1 mb-2">{msg.time}</div>
                  )}
                  <div className={`flex gap-2 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className="w-9 h-9 bg-gray-200 rounded-lg flex items-center justify-center text-base shrink-0">
                      {avatar}
                    </div>
                    {/* Bubble */}
                    <div className={`max-w-[70%] ${isMine ? 'items-end' : 'items-start'} flex flex-col`}>
                      {isGroup && (
                        <span className={`text-[11px] text-gray-400 mb-0.5 ${isMine ? 'text-right' : 'text-left'}`}>
                          {name}
                        </span>
                      )}
                      <div
                        className={`px-3 py-2 rounded-lg text-[15px] leading-relaxed whitespace-pre-line ${
                          isMine
                            ? 'bg-[#95ec69] text-gray-900'
                            : 'bg-white text-gray-900'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    return (
      <AppLayout title={chatName} onBack={() => setView('chatList')}>
        <div className="flex-1 flex flex-col h-full">
          <ChatMessages />
          {isAdmin && !postRestored && (
            <div className="flex items-center gap-2 p-2.5 bg-white border-t border-gray-200">
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdminSend()}
                placeholder="姓名，地点，年份"
                className="flex-1 bg-[#f2f2f7] rounded-lg px-3 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#07c160]/30"
              />
              <button
                onClick={handleAdminSend}
                className="bg-[#07c160] text-white px-4 py-2.5 rounded-lg text-[14px] font-medium active:bg-[#06a850]"
              >
                发送
              </button>
            </div>
          )}
        </div>
      </AppLayout>
    )
  }

  return null
}
