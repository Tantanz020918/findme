import { useState } from 'react'
import AppLayout from '../../shared/AppLayout'
import ImageViewer from '../../shared/ImageViewer'
import campusMapUrl from '../../../assets/campus-map.webp'

type Page = 'home' | 'map' | 'bid' | 'floor' | 'dorm' | 'names' | 'calendar' | 'news'

// Deterministic random name generator
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

const femaleNames = ['张雨欣','刘思含','王芳','孙丽','李婷婷','吴静','马晓燕','黄丽华','郑颖','钱佳','朱云','何小梅','杨紫涵','徐梦琪','宋佳怡','谢雨桐','韩冰','曹悦','魏晓','邓思思','冯雪','蒋欣然','沈梦','唐静雯','许文婷','高晓红','董佳琪','袁思源','程雅','罗敏']
const maleNames = ['李明','王强','张伟','刘洋','陈浩','赵鑫','周磊','吴凯','孙鹏','杨帆','黄俊','马超','朱天宇','徐浩然','何宇航','宋子轩','谢明辉','韩博','曹睿','魏志强','冯家辉','蒋文斌','沈默','唐嘉豪','许亮','高远','董文杰','袁鑫宇','程浩','罗杰']

function generateRoomNames(building: number, room: number): string[] {
  // Special case: 9号楼302
  if (building === 9 && room === 302) {
    return ['林晓', '周雨彤', '陈思琪', '赵可欣']
  }
  const isFemale = [1, 3, 5, 8, 9, 12].includes(building)
  const namePool = isFemale ? femaleNames : maleNames
  const rand = seededRandom(building * 10000 + room)
  const indices = new Set<number>()
  while (indices.size < 4) {
    indices.add(Math.floor(rand() * namePool.length))
  }
  return [...indices].map(i => namePool[i])
}

export default function SchoolWeb() {
  const [page, setPage] = useState<Page>('home')
  const [viewingImage, setViewingImage] = useState<{ src: string; exif?: Record<string, string> } | null>(null)
  const [queryBuilding, setQueryBuilding] = useState('')
  const [queryRoom, setQueryRoom] = useState('')
  const [queryResult, setQueryResult] = useState<string[] | null>(null)
  const [queryError, setQueryError] = useState('')

  const goHome = () => setPage('home')

  const handleQuery = () => {
    const b = parseInt(queryBuilding)
    const r = parseInt(queryRoom)
    if (!b || b < 1 || b > 12) {
      setQueryError('楼号不存在，请输入1-12')
      setQueryResult(null)
      return
    }
    if (isNaN(r)) {
      setQueryError('请输入房间号')
      setQueryResult(null)
      return
    }
    // Each building has 6 floors, each floor has rooms x01-x04
    const floor = Math.floor(r / 100)
    const unit = r % 100
    if (floor < 1 || floor > 6 || unit < 1 || unit > 4) {
      setQueryError('房间不存在。每栋楼共6层，每层4间寝室（如101-104、201-204……601-604）')
      setQueryResult(null)
      return
    }
    setQueryError('')
    setQueryResult(generateRoomNames(b, r))
  }

  if (page === 'map') {
    return (
      <AppLayout title="校园地图" onBack={goHome}>
        <div className="p-4">
          <div
            className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer border border-gray-200"
            onClick={() => setViewingImage({ src: campusMapUrl })}
          >
            <img src={campusMapUrl} alt="校园地图" className="w-full h-full object-contain rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
                ;(e.target as HTMLImageElement).parentElement!.innerHTML = `
                  <div class="text-xs text-gray-500 p-4 text-left leading-relaxed">
                    <div class="font-bold text-sm mb-2 text-center">校园地图</div>
                    <div class="mb-1">宿舍区分布（共12栋）：</div>
                    <div>东面4栋：7号楼、8号楼、9号楼、10号楼</div>
                    <div>北面4栋：1号楼、2号楼、3号楼、4号楼</div>
                    <div>西面4栋：5号楼、6号楼、11号楼、12号楼</div>
                    <div class="mt-2 mb-1">银杏树分布：</div>
                    <div>东面：9号楼旁、10号楼旁</div>
                    <div>北面：1号楼旁、3号楼旁</div>
                    <div>西面：5号楼旁、11号楼旁</div>
                    <div class="mt-2">9号楼东面紧邻校园外墙</div>
                    <div class="mt-2 text-gray-400">其他：教学楼、图书馆、食堂、体育馆...</div>
                  </div>
                `
              }}
            />
          </div>
        </div>
        {viewingImage && <ImageViewer src={viewingImage.src} onClose={() => setViewingImage(null)} />}
      </AppLayout>
    )
  }

  if (page === 'bid') {
    return (
      <AppLayout title="招标公示" onBack={goHome}>
        <div className="p-4 space-y-3">
          {/* 1. 食堂空调 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-[15px] font-semibold text-black">2020年学生食堂空调安装项目招标公告</h3>
            <p className="text-[12px] text-gray-400 mt-1">发布时间：2020-05-20</p>
            <div className="mt-3 text-[14px] text-gray-700 leading-relaxed">
              <p>为改善学生就餐环境，提升夏季用餐舒适度，现对一、二食堂空调系统安装进行公开招标。</p>
              <p className="mt-2 font-medium">项目概况：</p>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-[13px]">
                <li>项目名称：学生食堂空调系统安装工程</li>
                <li>建设地点：第一食堂（3层）、第二食堂（2层）</li>
                <li>建设内容：安装中央空调系统，含室外机组、风管及控制系统</li>
                <li>技术要求：制冷量不低于120kW/层，能效等级二级以上</li>
                <li>施工周期：45个工作日，须在暑假期间完工</li>
                <li>预算金额：85万元</li>
              </ul>
              <p className="mt-2 text-[12px] text-gray-400">投标截止时间：2020-06-20</p>
            </div>
          </div>
          {/* 2. 路灯 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-[15px] font-semibold text-black">2021年宿舍区道路照明改造工程招标公告</h3>
            <p className="text-[12px] text-gray-400 mt-1">发布时间：2021-03-15</p>
            <div className="mt-3 text-[14px] text-gray-700 leading-relaxed">
              <p>根据学校基础设施升级改造规划，现对宿舍区道路照明系统进行公开招标。</p>
              <p className="mt-2 font-medium">项目概况：</p>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-[13px]">
                <li>项目名称：宿舍区道路照明改造工程</li>
                <li>建设地点：学生宿舍区（东、北、西三个区域）</li>
                <li>建设内容：更换老旧路灯，统一采用节能LED照明</li>
                <li>技术规格：采用8米单臂LED路灯，色温4000K，功率100W</li>
                <li>预计数量：共计86盏</li>
                <li>预算金额：128万元</li>
              </ul>
              <p className="mt-2 text-[12px] text-gray-400">投标截止时间：2021-04-15</p>
            </div>
          </div>
          {/* 3. 网络 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-[15px] font-semibold text-black">2023年校园网络升级改造招标公告</h3>
            <p className="text-[12px] text-gray-400 mt-1">发布时间：2023-01-10</p>
            <div className="mt-3 text-[14px] text-gray-700 leading-relaxed">
              <p>为提升校园网络覆盖质量和上网体验，现对全校无线网络系统进行升级改造招标。</p>
              <p className="mt-2 font-medium">项目概况：</p>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-[13px]">
                <li>项目名称：校园无线网络升级改造工程</li>
                <li>建设地点：教学区、宿舍区、图书馆、食堂等公共区域</li>
                <li>建设内容：更换老旧AP设备，部署WiFi 6接入点，升级核心交换机</li>
                <li>技术要求：单AP并发不低于200用户，支持802.11ax协议</li>
                <li>预计数量：新增/更换AP共计520台</li>
                <li>预算金额：200万元</li>
              </ul>
              <p className="mt-2 text-[12px] text-gray-400">投标截止时间：2023-02-28</p>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (page === 'floor') {
    return (
      <AppLayout title="楼层平面图" onBack={goHome}>
        <div className="p-4">
          <div className="bg-white rounded-2xl p-4 mb-4">
            <h3 className="text-[15px] font-semibold text-black mb-2">宿舍楼基本参数</h3>
            <div className="space-y-1.5 text-[14px] text-gray-600">
              <div className="flex justify-between"><span>楼栋总数</span><span className="text-black">12栋</span></div>
              <div className="flex justify-between"><span>每栋楼层数</span><span className="text-black">6层</span></div>
              <div className="flex justify-between"><span>标准层高</span><span className="text-black">3.5米</span></div>
              <div className="flex justify-between"><span>楼体总高</span><span className="text-black">约24米（含屋顶）</span></div>
              <div className="flex justify-between"><span>每层寝室数</span><span className="text-black">4间（x01-x04）</span></div>
              <div className="flex justify-between"><span>寝室类型</span><span className="text-black">四人间</span></div>
              <div className="flex justify-between"><span>每层公共设施</span><span className="text-black">公共水房（位于x02与x03之间）</span></div>
            </div>
          </div>
          <h3 className="text-[15px] font-semibold text-black mb-3">楼层布局（以1层为例）</h3>
          <div className="w-full bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs text-gray-600">
              <div className="flex gap-1">
                <div className="flex-1 border-2 border-gray-400 rounded p-2 text-center bg-white">
                  <div className="font-bold">101</div>
                  <div className="text-[10px] text-gray-400">四人间</div>
                </div>
                <div className="flex-1 border-2 border-gray-400 rounded p-2 text-center bg-white">
                  <div className="font-bold">102</div>
                  <div className="text-[10px] text-gray-400">四人间</div>
                </div>
                <div className="flex-1 border-2 border-gray-300 rounded p-2 text-center bg-gray-100">
                  <div className="font-bold text-gray-400">水房</div>
                </div>
                <div className="flex-1 border-2 border-gray-400 rounded p-2 text-center bg-white">
                  <div className="font-bold">103</div>
                  <div className="text-[10px] text-gray-400">四人间</div>
                </div>
                <div className="flex-1 border-2 border-gray-400 rounded p-2 text-center bg-white">
                  <div className="font-bold">104</div>
                  <div className="text-[10px] text-gray-400">四人间</div>
                </div>
              </div>
              <div className="text-center mt-2 text-gray-400">————— 外墙（窗户朝外）————— </div>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (page === 'dorm') {
    return (
      <AppLayout title="宿舍楼分配表" onBack={goHome}>
        <div className="p-4">
          <div className="bg-white rounded-2xl overflow-hidden">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-[12px]">
                  <th className="py-2.5 px-3 text-left">楼栋</th>
                  <th className="py-2.5 px-3 text-left">分配</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { no: '1号楼', type: '女生' },
                  { no: '2号楼', type: '男生' },
                  { no: '3号楼', type: '女生' },
                  { no: '4号楼', type: '男生' },
                  { no: '5号楼', type: '女生' },
                  { no: '6号楼', type: '男生' },
                  { no: '7号楼', type: '男生' },
                  { no: '8号楼', type: '女生' },
                  { no: '9号楼', type: '女生' },
                  { no: '10号楼', type: '男生' },
                  { no: '11号楼', type: '男生' },
                  { no: '12号楼', type: '女生' },
                ].map((row) => (
                  <tr key={row.no}>
                    <td className="py-2.5 px-3 font-medium">{row.no}</td>
                    <td className="py-2.5 px-3 text-gray-500">{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (page === 'names') {
    return (
      <AppLayout title="寝室分配查询" onBack={goHome}>
        <div className="p-4">
          <div className="bg-white rounded-2xl p-4 mb-4">
            <h3 className="text-[15px] font-semibold text-black mb-3">查询寝室成员</h3>
            <div className="flex gap-2 mb-3">
              <div className="flex-1">
                <label className="text-[12px] text-gray-400 mb-1 block">楼号</label>
                <input
                  value={queryBuilding}
                  onChange={(e) => { setQueryBuilding(e.target.value); setQueryResult(null); setQueryError('') }}
                  placeholder="如：9"
                  className="w-full bg-[#f2f2f7] rounded-xl px-3 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#007aff]/30"
                />
              </div>
              <div className="flex-1">
                <label className="text-[12px] text-gray-400 mb-1 block">房间号</label>
                <input
                  value={queryRoom}
                  onChange={(e) => { setQueryRoom(e.target.value); setQueryResult(null); setQueryError('') }}
                  onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
                  placeholder="如：302"
                  className="w-full bg-[#f2f2f7] rounded-xl px-3 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#007aff]/30"
                />
              </div>
            </div>
            <button
              onClick={handleQuery}
              className="w-full bg-[#007aff] text-white rounded-xl py-2.5 text-[15px] font-semibold active:bg-[#0066d6]"
            >
              查询
            </button>
            {queryError && <p className="text-[13px] text-red-500 mt-2 text-center">{queryError}</p>}
          </div>

          {queryResult && (
            <div className="bg-white rounded-2xl p-4">
              <h4 className="text-[13px] text-gray-400 mb-2">{queryBuilding}号楼 {queryRoom}室</h4>
              <div className="space-y-2">
                {queryResult.map((name, i) => (
                  <div key={i} className="flex items-center gap-3 py-1.5">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">👤</div>
                    <span className="text-[15px] text-black">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </AppLayout>
    )
  }

  if (page === 'calendar') {
    return (
      <AppLayout title="校历安排" onBack={goHome}>
        <div className="p-4">
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-[15px] font-semibold text-black mb-3">2024-2025学年第一学期</h3>
            <div className="space-y-2 text-[14px] text-gray-600">
              <p>9月2日 — 新生报到</p>
              <p>9月4日 — 正式上课</p>
              <p>10月1日-7日 — 国庆假期</p>
              <p>11月中旬 — 期中考试</p>
              <p>1月中旬 — 期末考试</p>
              <p>1月下旬 — 寒假开始</p>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (page === 'news') {
    return (
      <AppLayout title="校园新闻" onBack={goHome}>
        <div className="p-4 space-y-3">
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-[15px] font-semibold text-black">我校在全国大学生数学建模竞赛中获佳绩</h3>
            <p className="text-[12px] text-gray-400 mt-1">2024-09-01</p>
          </div>
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-[15px] font-semibold text-black">新学期图书馆开放时间调整通知</h3>
            <p className="text-[12px] text-gray-400 mt-1">2024-08-30</p>
          </div>
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-[15px] font-semibold text-black">校园西门人行道改造工程竣工</h3>
            <p className="text-[12px] text-gray-400 mt-1">2024-08-25</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  // Home
  return (
    <AppLayout title="学校官网">
      <div className="p-4 space-y-2.5">
        {([
          { id: 'map' as Page, icon: '🗺️', title: '校园地图', desc: '查看校区建筑分布' },
          { id: 'bid' as Page, icon: '📋', title: '招标公示', desc: '工程项目招标信息' },
          { id: 'floor' as Page, icon: '🏗️', title: '楼层平面图', desc: '各宿舍楼平面布局' },
          { id: 'dorm' as Page, icon: '🏠', title: '宿舍楼分配表', desc: '各楼栋男女生分配' },
          { id: 'names' as Page, icon: '🔍', title: '寝室分配查询', desc: '输入楼号房间号查询成员' },
          { id: 'calendar' as Page, icon: '📅', title: '校历安排', desc: '本学期校历' },
          { id: 'news' as Page, icon: '📰', title: '校园新闻', desc: '最新校园动态' },
        ]).map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 active:bg-gray-50 text-left"
          >
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <p className="text-[15px] font-medium text-black">{item.title}</p>
              <p className="text-[12px] text-gray-400">{item.desc}</p>
            </div>
            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        ))}
      </div>
    </AppLayout>
  )
}
