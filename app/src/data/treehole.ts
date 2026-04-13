export interface Reply {
  id: string
  author: string
  content: string
  time: string
}

export interface Post {
  id: string
  title: string
  preview: string
  content: string
  time: string
  author?: string
  pinned?: boolean
  hasImage?: boolean
  replies?: Reply[]
}

export const THREAT_AUTHOR = 'sunny_day2468'

export const announcePosts: Post[] = [
  {
    id: 'ann1',
    title: '欢迎新同学！',
    content: '亲爱的新同学们，欢迎来到XX大学！祝大家在这里度过充实快乐的大学时光。有任何问题可以在树洞提问，学长学姐们会热心解答～',
    preview: '亲爱的新同学们，欢迎来到XX大学！',
    time: '9月1日',
    author: '树洞管理员',
    replies: [
      { id: 'ra1-1', author: '开心的大一', content: '谢谢！终于开学了', time: '9月1日' },
      { id: 'ra1-2', author: '老学姐', content: '欢迎欢迎～有啥问题尽管问', time: '9月1日' },
    ],
  },
  {
    id: 'ann2',
    title: '树洞社区公约（请新同学必读）',
    content: '1. 尊重他人，文明发言\n2. 禁止人身攻击和恶意造谣\n3. 禁止发布涉及隐私的照片或信息\n4. 违规帖子将被删除，严重者封号\n\n让我们共同维护友好的校园社区环境。',
    preview: '请新同学必读，共同维护友好社区环境。',
    time: '8月28日',
    author: '树洞管理员',
    replies: [
      { id: 'ra2-1', author: '守法好公民', content: '收到！', time: '8月28日' },
    ],
  },
  {
    id: 'ann3',
    title: '开学季活动：分享你的开学第一天',
    content: '新学期开始啦！欢迎大家在树洞分享你的开学第一天，晒晒新寝室、新教室、新同学～\n\n参与话题的优质帖子将获得"树洞之星"称号。',
    preview: '欢迎大家分享开学第一天！',
    time: '9月2日',
    author: '树洞管理员',
    replies: [
      { id: 'ra3-1', author: '元气满满', content: '开学第一天就下雨了哈哈', time: '9月2日' },
      { id: 'ra3-2', author: '摄影爱好者', content: '拍了好多校园的照片 等会发', time: '9月2日' },
    ],
  },
]

export const treeholePosts: Post[] = [
  {
    id: 'fake1',
    title: '求问图书馆自习室怎么预约',
    preview: '新生求助，图书馆自习室要用什么系统预约啊...',
    content: '新生求助，图书馆自习室要用什么系统预约啊？学校官网上没找到入口。',
    time: '3天前',
    author: '迷路的大一新生',
    replies: [
      { id: 'r1-1', author: '图书馆常驻选手', content: '下载"智慧校园"App，里面有预约入口', time: '3天前' },
      { id: 'r1-2', author: '学姐带你飞', content: '也可以直接去前台刷校园卡，不用预约', time: '3天前' },
    ],
  },
  {
    id: 'fake2',
    title: '食堂三楼新开的麻辣烫好吃吗',
    preview: '有没有人去尝过，值不值得排队...',
    content: '听说食堂三楼新开了一家麻辣烫，有没有人去尝过？值不值得排队？',
    time: '2天前',
    author: '干饭人',
    replies: [
      { id: 'r2-1', author: '吃货一号', content: '昨天去吃了，味道还行，就是有点咸', time: '2天前' },
      { id: 'r2-2', author: '减肥失败', content: '排了20分钟 不值得 二楼的拌面更好', time: '1天前' },
      { id: 'r2-3', author: '干饭人', content: '好 那我去试试拌面', time: '1天前' },
    ],
  },
  {
    id: 'fake3',
    title: '表白墙#1024',
    preview: '致7号楼的那个穿白色卫衣的男生...',
    content: '致7号楼那个每天早上在操场跑步的穿白色卫衣的男生，你真的很帅，但我不敢搭话。',
    time: '1天前',
    author: '胆小的暗恋者',
    replies: [
      { id: 'r3-1', author: '月老在线', content: '冲！有什么不敢的', time: '1天前' },
      { id: 'r3-2', author: '过来人', content: '先加个微信嘛 操场上很好搭话的', time: '1天前' },
      { id: 'r3-3', author: '7号楼住户', content: '我知道是谁了哈哈哈哈哈', time: '20小时前' },
    ],
  },
  {
    id: 'threat',
    title: '我有你的私密相片',
    preview: '你自己清楚。',
    content: '我有你的私密相片，你自己清楚。',
    time: '今天 03:27',
    author: THREAT_AUTHOR,
    hasImage: true,
    replies: [
      { id: 'rt-1', author: '吃瓜群众', content: '？这是什么情况', time: '今天 07:15' },
      { id: 'rt-2', author: '路过看看', content: '感觉是恶作剧吧', time: '今天 08:40' },
      { id: 'rt-3', author: '正义使者', content: '这种帖子不应该举报吗', time: '今天 09:02' },
    ],
  },
  {
    id: 'fake4',
    title: '二手出 高数教材+线代教材',
    preview: '九成新，笔记很少，打包50...',
    content: '大一上用的高数和线代教材，九成新，笔记很少。打包50，单本30。西门自取。联系方式私信。',
    time: '今天 08:15',
    author: '学长清仓',
    replies: [
      { id: 'r4-1', author: '大一萌新', content: '高数还在吗？想要', time: '今天 09:20' },
      { id: 'r4-2', author: '学长清仓', content: '在的 私信我吧', time: '今天 09:35' },
    ],
  },
  {
    id: 'fake5',
    title: '失物招领：校园卡',
    preview: '在食堂一楼捡到一张校园卡...',
    content: '在食堂一楼捡到一张校园卡，名字是张xx，请来食堂一楼收银台领取。',
    time: '今天 10:32',
    author: '好心人',
    replies: [
      { id: 'r5-1', author: '热心市民', content: '好人好事👍', time: '今天 10:50' },
    ],
  },
]

export interface HiddenPost {
  id: string
  garbledTitle: string
  decodedTitle: string
  restoredContent: string
}

export const hiddenPosts: HiddenPost[] = [
  {
    id: 'hidden1',
    garbledTitle: '[学习记录]',
    decodedTitle: '学习记录',
    restoredContent: '',
  },
  {
    id: 'hidden2',
    garbledTitle: '鍏ヨ亴8鍛ㄥ勾鎴戠殑鎰熸兂',
    decodedTitle: '入职8周年我的感想',
    restoredContent: `今天又是重复的一天。有时候想想，当初为什么没坚持呢。

小时候看那些推理小说能看一整天，后来想考犯罪心理学的研，觉得那才是我想做的事。但他说我不行，说那些东西不实际，说考公才是正路。我就信了。

现在每天在体制里，稳定是稳定了，可好像哪里空了一块。

昨天偶然翻到以前的读书笔记，密密麻麻写了好几本。那个时候的我，好像比现在的我活得更像个人。

算了，也没人看这个帖子。就当自言自语吧。`,
  },
]

export interface SecurityQuestion {
  question: string
  answer: string[]
}

export const securityQuestions: SecurityQuestion[] = [
  {
    question: '最常喝的饮品',
    answer: ['桂花乌龙'],
  },
  {
    question: '生日（如：0131）',
    answer: ['0816', '08月16日', '8月16日', '8.16', '08.16'],
  },
  {
    question: '最爱的书',
    answer: ['白夜行'],
  },
]

export const CORRECT_PASSWORD = 'linxiao0816'
