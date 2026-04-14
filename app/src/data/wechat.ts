import trainSelfieUrl from '../assets/train-selfie.webp'
import bookUrl from '../assets/book.webp'
import cakeUrl from '../assets/cake.webp'
import movieTicketsUrl from '../assets/movie-tickets.webp'
import sceneryUrl from '../assets/scenery.webp'

export interface ChatMessage {
  id: string
  sender: 'me' | 'other'
  senderName?: string
  senderAvatar?: string
  content: string
  time?: string
  isImage?: boolean
  imageSrc?: string
}

export interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  messages: ChatMessage[]
  isGroup?: boolean
}

export const chats: Chat[] = [
  {
    id: 'classmate',
    name: '王佳琪',
    avatar: '🧑',
    lastMessage: '',
    messages: [
      { id: 'c0', sender: 'other', content: '你看树洞了吗！！有个神秘爆料贴', time: '9月6日 08:30' },
      { id: 'c0b', sender: 'other', content: '说有人的私密照片 也不知道受害者是谁', time: '9月6日 08:31' },
      { id: 'c0c', sender: 'other', content: '好可怕 你快去看看', time: '9月6日 08:31' },
      { id: 'c1', sender: 'me', content: '啊？我去看看', time: '9月6日 08:35' },
      { id: 'c2', sender: 'other', content: '选课选了吗 顺便问一下', time: '9月6日 09:00' },
      { id: 'c3', sender: 'me', content: '选了 你呢', time: '9月6日 09:30' },
      { id: 'c4', sender: 'other', content: '我还没 有什么推荐的选修吗', time: '9月6日 09:31' },
      { id: 'c5', sender: 'me', content: '心理学导论还不错', time: '9月6日 09:35' },
      { id: 'c6', sender: 'other', content: '好的好的', time: '9月6日 09:36' },
    ],
  },
  {
    id: 'mom',
    name: '妈妈',
    avatar: '👩',
    lastMessage: '到宿舍了，一切顺利',
    messages: [
      { id: 'm1', sender: 'other', content: '到了没有？', time: '9月2日 11:45' },
      { id: 'm2', sender: 'me', content: '快了快了 马上', time: '9月2日 11:50' },
      { id: 'm3', sender: 'other', content: '路上小心', time: '9月2日 11:51' },
      { id: 'm4', sender: 'me', content: '到宿舍了，一切顺利', time: '9月2日 12:30' },
      { id: 'm5', sender: 'other', content: '好的 缺什么跟妈说', time: '9月2日 12:35' },
      { id: 'm6', sender: 'other', content: '吃饭了没', time: '9月2日 18:20' },
      { id: 'm7', sender: 'me', content: '吃了吃了 食堂还不错', time: '9月2日 18:45' },
      { id: 'm8', sender: 'other', content: '天气预报说明天降温 记得加衣服', time: '9月3日 07:30' },
      { id: 'm9', sender: 'me', content: '知道啦', time: '9月3日 08:12' },
    ],
  },
  {
    id: 'bf',
    name: '宝宝',
    avatar: '👦',
    lastMessage: '',
    messages: [
      { id: 'b1', sender: 'other', content: '宝贝到学校了吗', time: '9月2日 13:00' },
      { id: 'b2', sender: 'me', content: '嗯～中午到的 想你了', time: '9月2日 13:05' },
      { id: 'b3', sender: 'other', content: '我也想你 晚上视频', time: '9月2日 13:06' },
      { id: 'b4', sender: 'me', content: '好呀', time: '9月2日 13:07' },
      { id: 'b5', sender: 'me', content: '我今天看到一个犯罪心理学的讲座 好想去听', time: '9月3日 19:50' },
      { id: 'b6', sender: 'other', content: '又是这些东西 你怎么还惦记着啊', time: '9月3日 19:55' },
      { id: 'b7', sender: 'me', content: '就是感兴趣嘛', time: '9月3日 19:57' },
      { id: 'b8', sender: 'other', content: '宝贝你听我说 那些东西当爱好看看就行了 别当真', time: '9月3日 19:58' },
      { id: 'b9', sender: 'other', content: '考公才是正经事 稳定 离家近 咱俩以后也方便', time: '9月3日 19:59' },
      { id: 'b10', sender: 'other', content: '我报的岗位也在你家那边，到时候咱俩一起回去', time: '9月3日 20:00' },
      { id: 'b11', sender: 'me', content: '嗯…你说的也对', time: '9月3日 20:05' },
      { id: 'b12', sender: 'other', content: '乖 听话 我都是为你好', time: '9月3日 20:06' },
      { id: 'b13', sender: 'me', content: '晚上一起吃饭吗', time: '9月5日 17:30' },
      { id: 'b14', sender: 'other', content: '今天不了 忙 你自己吃 别饿着', time: '9月5日 18:00' },
      { id: 'b15', sender: 'other', content: '对了 别再看那些推理小说了 早点睡', time: '9月5日 23:10' },
      { id: 'b16', sender: 'me', content: '知道了 晚安', time: '9月5日 23:15' },
      { id: 'b17', sender: 'other', content: '晚安宝贝😘', time: '9月5日 23:16' },
    ],
  },
  {
    id: 'dorm',
    name: '302温馨小窝',
    avatar: '🏠',
    lastMessage: '赵可欣：好的我去拿',
    isGroup: true,
    messages: [
      { id: 'd1', sender: 'other', senderName: '周雨彤', senderAvatar: '🧑‍🦰', content: '你们用什么洗衣液啊 推荐一下', time: '9月4日 20:15' },
      { id: 'd2', sender: 'me', content: '蓝月亮的还行 薰衣草味的', time: '9月4日 20:18' },
      { id: 'd3', sender: 'other', senderName: '陈思琪', senderAvatar: '👧', content: '空调好热 谁开的26度啊', time: '9月4日 23:10' },
      { id: 'd4', sender: 'other', senderName: '周雨彤', senderAvatar: '🧑‍🦰', content: '不是我！我怕冷的', time: '9月4日 23:12' },
      { id: 'd5', sender: 'other', senderName: '赵可欣', senderAvatar: '👩‍🦱', content: '明天谁有空帮我去菜鸟驿站拿个快递', time: '9月4日 23:30' },
      { id: 'd6', sender: 'me', content: '我下午没课 可以帮你', time: '9月4日 23:32' },
      { id: 'd7', sender: 'other', senderName: '赵可欣', senderAvatar: '👩‍🦱', content: '爱你么么', time: '9月5日 10:00' },
      { id: 'd8', sender: 'other', senderName: '周雨彤', senderAvatar: '🧑‍🦰', content: '今晚吃啥 有推荐吗', time: '9月5日 17:30' },
      { id: 'd9', sender: 'me', content: '食堂三楼的麻辣烫还行', time: '9月5日 17:35' },
    ],
  },
  {
    id: 'grade',
    name: '2022级年级群',
    avatar: '📚',
    lastMessage: '赵可欣：收到',
    isGroup: true,
    messages: [
      { id: 'g1', sender: 'other', senderName: '辅导员张老师', senderAvatar: '👨‍🏫', content: '各位同学好，开学报到相关事项请查看群公告。', time: '8月30日 09:00' },
      { id: 'g2', sender: 'other', senderName: '辅导员张老师', senderAvatar: '👨‍🏫', content: '请各寝室长9月2日下午2-3点到行政楼203会议室开迎新工作会议，务必到场。', time: '9月1日 16:00' },
      { id: 'g3', sender: 'other', senderName: '赵可欣', senderAvatar: '👩‍🦱', content: '收到', time: '9月1日 16:05' },
      { id: 'g4', sender: 'other', senderName: '李明', senderAvatar: '🧑', content: '收到', time: '9月1日 16:06' },
      { id: 'g5', sender: 'other', senderName: '王婷', senderAvatar: '👩', content: '收到', time: '9月1日 16:07' },
      { id: 'g6', sender: 'other', senderName: '陈浩', senderAvatar: '👦', content: '请问教材在哪里领？', time: '9月2日 10:30' },
      { id: 'g7', sender: 'other', senderName: '辅导员张老师', senderAvatar: '👨‍🏫', content: '教材发放点在图书馆一楼大厅', time: '9月2日 10:45' },
    ],
  },
  {
    id: 'course',
    name: '高等数学A班群',
    avatar: '📐',
    lastMessage: '收到',
    isGroup: true,
    messages: [
      { id: 'co1', sender: 'other', senderName: '课代表小张', senderAvatar: '🧑‍🎓', content: '第一次课在教2-301，不要走错了', time: '9月3日 20:00' },
      { id: 'co2', sender: 'other', senderName: '同学A', senderAvatar: '🧑', content: '收到', time: '9月3日 20:01' },
      { id: 'co3', sender: 'me', content: '收到', time: '9月3日 20:05' },
    ],
  },
]

export interface MomentPost {
  id: string
  author: string
  avatar: string
  content: string
  time: string
  images?: string[]
  location?: string
}

export const moments: MomentPost[] = [
  {
    id: 'mo6',
    author: '林晓',
    avatar: '👩',
    content: '秋天的校园好美',
    time: '9月5日 16:00',
    images: [sceneryUrl],
  },
  {
    id: 'mo7',
    author: '王佳琪',
    avatar: '🧑',
    content: '开学第一天就迟到了😭 教室好难找',
    time: '9月4日 08:30',
  },
  {
    id: 'mo5',
    author: '周雨彤',
    avatar: '🧑‍🦰',
    content: '食堂探店第一弹！三楼的麻辣烫真的绝了，强烈推荐！就是排队有点久',
    time: '9月3日 19:00',
  },
  {
    id: 'mo4',
    author: '刘洋（同学D）',
    avatar: '🧑',
    content: '最后的暑假！和好朋友一起看电影🎬',
    time: '9月3日 14:30',
    images: [movieTicketsUrl],
    location: '星光影城（xx省xx市）',
  },
  {
    id: 'mo1',
    author: '周雨彤',
    avatar: '🧑‍🦰',
    content: '高铁上无聊死了，预计三点半到🚄 有没有人接站！',
    time: '9月2日 12:48',
    images: [trainSelfieUrl],
  },
  {
    id: 'mo3',
    author: '林晓',
    avatar: '👩',
    content: '生日快乐🎂 又老了一岁',
    time: '8月16日',
    images: [cakeUrl],
  },
  {
    id: 'mo2',
    author: '林晓',
    avatar: '👩',
    content: '"世上有两样东西不可直视，一是太阳，二是人心。"\n三刷，每次看都有新的感受。',
    time: '8月15日',
    images: [bookUrl],
  },
]

export const ADMIN_CORRECT_ANSWER = {
  name: '林晓',
  location: '桃源市',
  year: '2034',
}
