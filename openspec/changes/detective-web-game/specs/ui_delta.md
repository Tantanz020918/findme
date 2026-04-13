# Delta: UI Components

**Change ID:** `detective-web-game`
**Affects:** 手机模拟器、6个APP界面、共享组件

---

## ADDED

### Requirement: 手机模拟器外壳

玩家在浏览器中看到一个模拟手机界面，所有交互在手机框内完成。

#### Scenario: 大屏幕访问（宽度 > 500px）
- GIVEN 玩家在桌面或平板浏览器打开游戏
- WHEN 页面加载完成
- THEN 页面居中显示手机模拟器外壳（圆角边框、顶部刘海等装饰），内部区域约375x812px，外壳外为深色背景

#### Scenario: 小屏幕访问（宽度 <= 500px）
- GIVEN 玩家在手机浏览器打开游戏
- WHEN 页面加载完成
- THEN 不显示模拟器外壳，直接全屏显示内部内容区域

---

### Requirement: 主屏幕与APP导航

#### Scenario: 查看主屏幕
- GIVEN 玩家在主屏幕
- WHEN 查看屏幕
- THEN 显示6个APP图标：树洞、学校官网、微信、外卖/购物、设置，以及状态栏。所有APP均为仿iOS端风格。

#### Scenario: 进入APP
- GIVEN 玩家在主屏幕
- WHEN 点击某个APP图标
- THEN 进入该APP的界面

#### Scenario: 返回主屏幕
- GIVEN 玩家在某个APP内
- WHEN 点击底部返回按钮或手势返回
- THEN 返回主屏幕

---

### Requirement: 图片查看器（内置EXIF）

#### Scenario: 查看普通图片
- GIVEN 玩家在任意APP中看到图片
- WHEN 点击图片
- THEN 弹出大图查看器，底部显示"解析EXIF"按钮

#### Scenario: 解析无关图片EXIF
- GIVEN 玩家打开了一张非关键图片的大图
- WHEN 点击"解析EXIF"
- THEN 显示"无有效信息"

#### Scenario: 解析威胁帖照片EXIF
- GIVEN 玩家打开了威胁帖附图的大图
- WHEN 点击"解析EXIF"
- THEN 显示拍摄时间：9月2日14:22，触发线索8

#### Scenario: 解析账号历史头像EXIF
- GIVEN 玩家已登录发帖人账号，打开历史头像大图
- WHEN 点击"解析EXIF"
- THEN 显示GPS坐标信息，触发线索17

---

### Requirement: 线索解锁通知

#### Scenario: 解锁新线索
- GIVEN 玩家触发了某条线索的解锁条件
- WHEN 条件满足
- THEN 屏幕底部弹出通知："线索X已解锁：{线索名称}"，持续3秒后消失

---

### Requirement: 树洞论坛

#### Scenario: 浏览帖子列表
- GIVEN 玩家进入树洞APP
- WHEN 查看首页
- THEN 显示帖子列表，包含威胁帖（置顶/醒目）和多条混淆帖

#### Scenario: 找回密码
- GIVEN 玩家在发帖人账号页面
- WHEN 点击"忘记密码"
- THEN 依次弹出三个密保问题，答对后显示原始密码 linxiao0816

#### Scenario: 登录后查看隐藏内容
- GIVEN 玩家使用密码登录成功
- WHEN 查看账号内容
- THEN 显示历史头像、隐藏帖子一（学习照片）、隐藏帖子二（乱码标题+加密内容）

---

### Requirement: 微信

#### Scenario: 浏览聊天列表（管理员未解锁）
- GIVEN admin_chat_unlocked = false
- WHEN 玩家进入微信查看聊天页
- THEN 显示聊天列表：妈妈、男朋友、寝室群、年级群、其他混淆聊天。不显示管理员。

#### Scenario: 浏览聊天列表（管理员已解锁）
- GIVEN admin_chat_unlocked = true
- WHEN 玩家进入微信查看聊天页
- THEN 聊天列表顶部新增"论坛管理员"聊天

#### Scenario: 管理员数据恢复交互
- GIVEN 玩家打开管理员聊天
- WHEN 管理员发送开场消息说明需要提供信息
- THEN 玩家在聊天输入框按格式「发帖人姓名，发帖地点，发帖年份」发送，正确则返回恢复内容，错误则提示重试

#### Scenario: 切换到朋友圈
- GIVEN 玩家在微信APP
- WHEN 点击"朋友圈"标签
- THEN 显示朋友圈动态列表

---

### Requirement: 外卖/购物App

#### Scenario: 查看历史订单
- GIVEN 玩家进入外卖/购物App
- WHEN 查看订单页
- THEN 显示混合的外卖和购物订单，桂花乌龙频繁出现

#### Scenario: 查看购物车
- GIVEN 玩家进入购物车
- WHEN 查看购物车列表
- THEN 显示手表（关键）和日用品（混淆）

#### Scenario: 查看收货地址
- GIVEN 玩家进入地址管理
- WHEN 查看地址列表
- THEN 显示学校地址（XX大学9号楼）和家庭住址（桃源市XX区XX路）

---

### Requirement: 学校官网

#### Scenario: 查看校园地图
- GIVEN 玩家进入学校官网
- WHEN 点击"校园地图"栏目
- THEN 显示12栋宿舍楼分布、银杏树标注、围墙位置

#### Scenario: 查看招标公告
- GIVEN 玩家进入学校官网
- WHEN 浏览招标公示栏
- THEN 可找到路灯改造工程公告，写明"采用8米单臂LED路灯"

#### Scenario: 查看户型图
- GIVEN 玩家进入宿管公示
- WHEN 查看9号楼4楼平面图
- THEN 显示东面布局：401、402、公共水房（磨砂窗）、403、404

#### Scenario: 查看寝室分配名单
- GIVEN 玩家进入宿管公示
- WHEN 查看寝室分配名单
- THEN 显示所有12栋楼每栋楼的分寝名单（每间寝室的学生姓名），用于混淆。其中包含9号楼402室的四人名单。

---

### Requirement: 设置APP

仿 iOS 设置界面风格。

#### Scenario: 查看设置
- GIVEN 玩家点击主屏幕上的"设置"图标
- WHEN 进入设置APP
- THEN 显示 iOS 风格的设置列表，包含"清除游戏数据"选项（红色文字）

#### Scenario: 清除游戏数据
- GIVEN 玩家在设置中
- WHEN 点击"清除游戏数据"
- THEN 弹出确认弹窗，确认后清除 localStorage 中所有游戏数据并刷新页面

---

## MODIFIED

(None)

---

## REMOVED

(None)
