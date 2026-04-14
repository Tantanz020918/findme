import { useState } from 'react'
import AppLayout from '../../shared/AppLayout'
import { useGameStore } from '../../../store/gameStore'
import { treeholePosts, announcePosts, hiddenPosts, securityQuestions, CORRECT_PASSWORD, THREAT_AUTHOR } from '../../../data/treehole'
import ImageViewer from '../../shared/ImageViewer'
import dormPhotoUrl from '../../../assets/dorm-photo.webp'
import buildingUrl from '../../../assets/building.webp'
import studyPhotoUrl from '../../../assets/study-photo.webp'

type Tab = 'announce' | 'recommend' | 'mine'
type View = 'tabs' | 'post' | 'recover' | 'account'

export default function TreeHole() {
  const { treeholeLoggedIn, login, unlockAdminChat, adminChatUnlocked, postRestored } = useGameStore()
  const [tab, setTab] = useState<Tab>('recommend')
  const [view, setView] = useState<View>('tabs')
  const [selectedPost, setSelectedPost] = useState<string | null>(null)

  // Login states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Recover states
  const [recoverUsername, setRecoverUsername] = useState('')
  const [recoverUsernameError, setRecoverUsernameError] = useState('')
  const [recoverUsernameVerified, setRecoverUsernameVerified] = useState(false)
  const [sqAnswers, setSqAnswers] = useState<string[]>(securityQuestions.map(() => ''))
  const [sqErrors, setSqErrors] = useState<boolean[]>(securityQuestions.map(() => false))
  const [showPassword, setShowPassword] = useState(false)

  const [viewingImage, setViewingImage] = useState<{ src: string; exif?: Record<string, string> } | null>(null)

  const handleLogin = () => {
    if (username.trim() === THREAT_AUTHOR && password === CORRECT_PASSWORD) {
      login()
      setLoginError('')
      setView('tabs')
    } else {
      setLoginError('用户名或密码错误')
    }
  }

  const handleRecoverUsernameCheck = () => {
    if (recoverUsername.trim() === THREAT_AUTHOR) {
      setRecoverUsernameVerified(true)
      setRecoverUsernameError('')
    } else {
      setRecoverUsernameError('用户名不存在或未设置密保')
    }
  }

  const handleSqSubmitAll = () => {
    const errors = securityQuestions.map((q, i) =>
      !q.answer.includes(sqAnswers[i].trim().toLowerCase())
    )
    setSqErrors(errors)
    if (errors.every((e) => !e)) {
      setShowPassword(true)
    }
  }

  const backToList = () => { setView('tabs'); setSelectedPost(null) }

  const openPost = (id: string) => {
    setSelectedPost(id)
    setView('post')
  }

  const handleViewHiddenPost2 = () => {
    openPost('hidden2')
    if (!adminChatUnlocked) {
      unlockAdminChat()
      useGameStore.getState().showNotification('论坛管理员聊天已解锁，请前往微信查看')
    }
  }

  // ===== Recover password =====
  if (view === 'recover') {
    return (
      <AppLayout title="找回密码" onBack={() => { setView('tabs'); setTab('mine'); setRecoverUsernameVerified(false); setRecoverUsername(''); setShowPassword(false) }}>
        <div className="p-5">
          {!recoverUsernameVerified ? (
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-[17px] font-semibold text-black mb-1">验证用户名</h3>
              <p className="text-[13px] text-gray-400 mb-4">请输入需要找回密码的用户名</p>
              <input
                value={recoverUsername}
                onChange={(e) => { setRecoverUsername(e.target.value); setRecoverUsernameError('') }}
                onKeyDown={(e) => e.key === 'Enter' && handleRecoverUsernameCheck()}
                placeholder="用户名"
                className="w-full bg-[#f2f2f7] rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#007aff]/30"
              />
              {recoverUsernameError && <p className="text-[13px] text-red-500 mt-2">{recoverUsernameError}</p>}
              <button
                onClick={handleRecoverUsernameCheck}
                className="w-full mt-4 bg-[#007aff] text-white rounded-xl py-3 text-[15px] font-semibold active:bg-[#0066d6]"
              >
                下一步
              </button>
            </div>
          ) : !showPassword ? (
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-[17px] font-semibold text-black mb-1">密保问题</h3>
              <p className="text-[13px] text-gray-400 mb-4">请回答以下全部问题以验证身份</p>
              <div className="space-y-4">
                {securityQuestions.map((q, i) => (
                  <div key={i}>
                    <label className="text-[14px] font-medium text-black block mb-1.5">{q.question}</label>
                    <input
                      value={sqAnswers[i]}
                      onChange={(e) => {
                        const newAnswers = [...sqAnswers]
                        newAnswers[i] = e.target.value
                        setSqAnswers(newAnswers)
                        const newErrors = [...sqErrors]
                        newErrors[i] = false
                        setSqErrors(newErrors)
                      }}
                      placeholder="请输入答案"
                      className={`w-full bg-[#f2f2f7] rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#007aff]/30 ${sqErrors[i] ? 'ring-2 ring-red-300' : ''}`}
                    />
                    {sqErrors[i] && <p className="text-[12px] text-red-500 mt-1">答案不正确</p>}
                  </div>
                ))}
              </div>
              <button
                onClick={handleSqSubmitAll}
                className="w-full mt-5 bg-[#007aff] text-white rounded-xl py-3 text-[15px] font-semibold active:bg-[#0066d6]"
              >
                验证
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✓</span>
              </div>
              <p className="text-[15px] text-gray-500 mb-3">密保验证通过，原始密码为：</p>
              <p className="text-[20px] font-mono font-bold text-black bg-[#f2f2f7] rounded-xl py-4 px-3 tracking-wider">{CORRECT_PASSWORD}</p>
              <button
                onClick={() => { setView('tabs'); setTab('mine'); setRecoverUsernameVerified(false); setRecoverUsername(''); setShowPassword(false) }}
                className="w-full mt-5 bg-[#007aff] text-white rounded-xl py-3 text-[15px] font-semibold active:bg-[#0066d6]"
              >
                返回登录
              </button>
            </div>
          )}
        </div>
      </AppLayout>
    )
  }

  // ===== Post detail =====
  if (view === 'post' && selectedPost) {
    const mainPost = treeholePosts.find((p) => p.id === selectedPost) || announcePosts.find((p) => p.id === selectedPost)

    if (selectedPost === 'hidden1') {
      return (
        <AppLayout title="帖子详情" onBack={backToList}>
          <div className="p-5">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 pb-3">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-sm">👤</div>
                  <div>
                    <p className="text-[14px] font-medium text-black leading-tight">{THREAT_AUTHOR}</p>
                    <p className="text-[11px] text-gray-400">发布于树洞</p>
                  </div>
                </div>
                <p className="text-[15px] text-gray-600 mb-3">记录一下学习日常</p>
              </div>
              <div
                className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center cursor-pointer"
                onClick={() => setViewingImage({ src: studyPhotoUrl })}
              >
                <img src={studyPhotoUrl} alt="学习照片" className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                    ;(e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-gray-400 text-[13px] text-center p-6">图片加载失败，请稍后重试</div>'
                  }}
                />
              </div>
            </div>
          </div>
          {viewingImage && <ImageViewer src={viewingImage.src} exifData={viewingImage.exif} onClose={() => setViewingImage(null)} />}
        </AppLayout>
      )
    }

    if (selectedPost === 'hidden2') {
      return (
        <AppLayout title="帖子详情" onBack={backToList}>
          <div className="p-5">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-sm">👤</div>
                <div>
                  <p className="text-[14px] font-medium text-black leading-tight">{THREAT_AUTHOR}</p>
                  <p className="text-[11px] text-gray-400">发布于树洞</p>
                </div>
              </div>
              <p className="text-[13px] font-mono text-gray-400 break-all bg-[#f2f2f7] rounded-xl p-3 mb-3 leading-relaxed">{hiddenPosts[1].garbledTitle}</p>
              <div className="bg-[#f2f2f7] rounded-xl p-4">
                {postRestored ? (
                  <div className="text-[15px] text-gray-800 leading-relaxed whitespace-pre-line">{hiddenPosts[1].restoredContent}</div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-3xl mb-2">⚠️</div>
                    <p className="text-[14px] text-gray-400">帖子正文内容已损坏</p>
                    <p className="text-[12px] text-gray-300 mt-1">数据严重损坏，非编码问题<br/>需联系管理员进行底层数据恢复</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AppLayout>
      )
    }

    if (selectedPost === 'avatar') {
      return (
        <AppLayout title="历史头像" onBack={backToList}>
          <div className="p-5">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div
                className="w-full aspect-square bg-gray-100 flex items-center justify-center cursor-pointer"
                onClick={() => setViewingImage({
                  src: buildingUrl,
                  exif: { 'GPS坐标': '34.0159°N, 118.2905°W', '设备': 'iPhone 15' },
                })}
              >
                <img src={buildingUrl} alt="建筑" className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                    ;(e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-gray-400 text-[13px] text-center p-6">图片加载失败，请稍后重试</div>'
                  }}
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-[12px] text-gray-400">点击图片查看大图并解析EXIF信息</p>
              </div>
            </div>
          </div>
          {viewingImage && <ImageViewer src={viewingImage.src} exifData={viewingImage.exif} onClose={() => setViewingImage(null)} />}
        </AppLayout>
      )
    }

    if (mainPost) {
      return (
        <AppLayout title="帖子详情" onBack={backToList}>
          <div className="p-5">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-sm">👤</div>
                  <div>
                    <p className="text-[14px] font-medium text-black leading-tight">{mainPost.author || '未知用户'}</p>
                    <p className="text-[11px] text-gray-400">{mainPost.time}</p>
                  </div>
                </div>
                <h2 className="text-[17px] font-semibold text-black mb-2">{mainPost.title}</h2>
                <div className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">{mainPost.content}</div>
              </div>
              {mainPost.hasImage && (
                <div
                  className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center cursor-pointer"
                  onClick={() => setViewingImage({ src: dormPhotoUrl, exif: { '拍摄时间': '9月2日 14:22', '设备': 'iPhone 13 mini' } })}
                >
                  <img src={dormPhotoUrl} alt="宿舍楼" className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                      ;(e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-gray-400 text-[13px] text-center p-6">图片加载失败，请稍后重试</div>'
                    }}
                  />
                </div>
              )}
            </div>
            {/* Replies */}
            {mainPost.replies && mainPost.replies.length > 0 && (
              <div className="mt-3 bg-white rounded-2xl shadow-sm">
                <div className="px-4 py-2.5 border-b border-gray-100">
                  <span className="text-[13px] text-gray-400">{mainPost.replies.length}条回复</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {mainPost.replies.map((reply) => (
                    <div key={reply.id} className="px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px]">👤</div>
                        <span className="text-[13px] font-medium text-black">{reply.author}</span>
                        <span className="text-[11px] text-gray-400">{reply.time}</span>
                      </div>
                      <p className="text-[14px] text-gray-700 pl-8">{reply.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {viewingImage && <ImageViewer src={viewingImage.src} exifData={viewingImage.exif} onClose={() => setViewingImage(null)} />}
        </AppLayout>
      )
    }
  }

  // ===== Main tab view =====
  const allPosts = treeholePosts

  return (
    <AppLayout title="树洞">
      {/* Tab bar */}
      <div className="flex bg-white border-b border-gray-200/60">
        {([['announce', '公告'], ['recommend', '推荐'], ['mine', '我的']] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 py-3 text-[14px] font-medium relative ${tab === key ? 'text-black' : 'text-gray-400'}`}
          >
            {label}
            {tab === key && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[3px] bg-black rounded-full" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* ===== 公告 ===== */}
        {tab === 'announce' && (
          <div className="p-4 space-y-3">
            {announcePosts.map((post) => (
              <PostCard key={post.id} post={post} onClick={() => openPost(post.id)} />
            ))}
          </div>
        )}

        {/* ===== 推荐 ===== */}
        {tab === 'recommend' && (
          <div className="p-4 space-y-3">
            {allPosts.map((post) => (
              <PostCard key={post.id} post={post} onClick={() => openPost(post.id)} />
            ))}
          </div>
        )}

        {/* ===== 我的 ===== */}
        {tab === 'mine' && (
          <div className="p-5">
            {treeholeLoggedIn ? (
              <>
                {/* Profile card with avatar */}
                <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer"
                      onClick={() => setViewingImage({
                        src: buildingUrl,
                        exif: { 'GPS坐标': '34.0159°N, 118.2905°W', '设备': 'iPhone 15' },
                      })}
                    >
                      <img src={buildingUrl} alt="头像" className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                          ;(e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-gray-400 text-[13px] text-center p-4">图片加载失败，请稍后重试</div>'
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-[17px] font-semibold text-black">{THREAT_AUTHOR}</p>
                      <p className="text-[13px] text-gray-400 mt-0.5">点击头像查看大图</p>
                    </div>
                  </div>
                </div>

                {/* My posts */}
                <div className="mb-2">
                  <h3 className="text-[13px] text-gray-400 font-medium mb-2 px-1">我的帖子</h3>
                </div>
                <div className="space-y-3">
                  {/* Threat post */}
                  <PostCard
                    post={treeholePosts.find((p) => p.id === 'threat')!}
                    onClick={() => openPost('threat')}
                  />
                  {/* Hidden post 1 - study photo */}
                  <button onClick={() => openPost('hidden1')} className="w-full bg-white rounded-2xl p-4 shadow-sm text-left active:bg-gray-50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-sm">🔒</div>
                      <div className="flex-1">
                        <p className="text-[14px] font-medium text-black">[私密] 学习记录</p>
                        <p className="text-[12px] text-gray-400">一张照片</p>
                      </div>
                      <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </div>
                  </button>
                  {/* Hidden post 2 - garbled */}
                  <button onClick={handleViewHiddenPost2} className="w-full bg-white rounded-2xl p-4 shadow-sm text-left active:bg-gray-50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-sm">🔒</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-black truncate">[私密] 乱码帖子</p>
                        <p className="text-[12px] text-gray-400">{postRestored ? '内容已恢复' : '⚠️ 内容损坏'}</p>
                      </div>
                      <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="w-16 h-16 bg-[#f2f2f7] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">👤</div>
                <h3 className="text-[17px] font-semibold text-black text-center mb-5">登录树洞</h3>
                <div className="space-y-3">
                  <input
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setLoginError('') }}
                    placeholder="用户名"
                    className="w-full bg-[#f2f2f7] rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#007aff]/30"
                  />
                  <input
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setLoginError('') }}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    type="password"
                    placeholder="密码"
                    className="w-full bg-[#f2f2f7] rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#007aff]/30"
                  />
                </div>
                {loginError && <p className="text-[13px] text-red-500 mt-2 text-center">{loginError}</p>}
                <button
                  onClick={handleLogin}
                  className="w-full mt-4 bg-[#007aff] text-white rounded-xl py-3 text-[15px] font-semibold active:bg-[#0066d6]"
                >
                  登录
                </button>
                <button
                  onClick={() => { setView('recover'); setRecoverUsername(''); setRecoverUsernameVerified(false); setRecoverUsernameError(''); setSqAnswers(securityQuestions.map(() => '')); setSqErrors(securityQuestions.map(() => false)); setShowPassword(false) }}
                  className="w-full mt-3 text-[#007aff] text-[14px] py-2"
                >
                  忘记密码？
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {viewingImage && <ImageViewer src={viewingImage.src} exifData={viewingImage.exif} onClose={() => setViewingImage(null)} />}
    </AppLayout>
  )
}

function PostCard({ post, onClick }: { post: typeof treeholePosts[0]; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-4 shadow-sm text-left active:bg-gray-50"
    >
      <div className="flex items-start gap-2.5">
        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-sm shrink-0">👤</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[14px] font-medium text-black">{post.author || '未知用户'}</span>
            <span className="text-[11px] text-gray-400">{post.time}</span>
          </div>
          <p className="text-[15px] text-black font-medium leading-snug">{post.title}</p>
          <p className="text-[13px] text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">{post.preview}</p>
          {post.hasImage && (
            <div className="mt-2 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
              <img src={dormPhotoUrl} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
