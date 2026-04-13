# Delta: State Management

**Change ID:** `detective-web-game`
**Affects:** localStorage 持久化、管理员聊天解锁、设置APP

---

## ADDED

### Requirement: localStorage 持久化

仅保存三项状态，不做游戏进度管理或线索追踪。

#### Scenario: 保存的状态项
- `treehole_logged_in`：布尔值，论坛账号是否已登录
- `admin_chat_unlocked`：布尔值，管理员聊天是否已解锁
- `post_restored`：布尔值，帖子二内容是否已恢复

#### Scenario: 首次访问
- GIVEN 玩家首次访问
- WHEN 页面加载
- THEN 三项状态均为 false

#### Scenario: 刷新页面
- GIVEN 玩家之前登录过论坛/解锁过管理员聊天/恢复过帖子
- WHEN 刷新页面
- THEN 从 localStorage 读取状态，保持之前的进度

---

### Requirement: 论坛账号状态

#### Scenario: 未登录
- GIVEN treehole_logged_in = false
- WHEN 查看发帖人账号
- THEN 仅显示基本信息，隐藏帖子不可见

#### Scenario: 已登录
- GIVEN 玩家完成密保+密码流程
- WHEN 登录成功
- THEN treehole_logged_in 写入 localStorage，显示历史头像、隐藏帖子一/二

---

### Requirement: 管理员聊天解锁

#### Scenario: 触发解锁
- GIVEN 玩家已登录论坛账号
- WHEN 玩家访问（点击/打开）隐藏帖子二
- THEN 弹出通知："论坛管理员聊天已解锁"，admin_chat_unlocked 写入 localStorage

#### Scenario: 解锁前的微信
- GIVEN admin_chat_unlocked = false
- WHEN 玩家打开微信聊天列表
- THEN 不显示"论坛管理员"这个聊天

#### Scenario: 解锁后的微信
- GIVEN admin_chat_unlocked = true
- WHEN 玩家打开微信聊天列表
- THEN 显示"论坛管理员"聊天，位于列表顶部（或醒目位置）

---

### Requirement: 管理员数据恢复

#### Scenario: 提交信息格式
- GIVEN 玩家在管理员聊天中
- WHEN 玩家在输入框输入并发送
- THEN 系统按格式解析：「发帖人姓名，发帖地点，发帖年份」（逗号分隔，三个字段）

#### Scenario: 信息正确
- GIVEN 玩家发送了正确的三项信息（林晓，桃源市，202x+10）
- WHEN 管理员收到
- THEN 管理员回复恢复成功，并返回帖子二的完整独白内容；post_restored 写入 localStorage

#### Scenario: 信息错误
- GIVEN 玩家发送的信息有误（任意一项不匹配）
- WHEN 管理员收到
- THEN 管理员回复"信息不匹配，无法定位数据，请确认后重试"

#### Scenario: 恢复后查看帖子二
- GIVEN post_restored = true
- WHEN 玩家回到树洞查看帖子二
- THEN 帖子正文显示完整独白内容（替代加密损坏状态）

---

### Requirement: 设置APP

仿 iOS 设置界面风格的系统设置应用。

#### Scenario: 查看设置
- GIVEN 玩家点击主屏幕上的"设置"图标
- WHEN 进入设置APP
- THEN 显示 iOS 风格的设置列表，包含"清除游戏数据"选项

#### Scenario: 清除游戏数据
- GIVEN 玩家在设置中
- WHEN 点击"清除游戏数据"
- THEN 弹出确认弹窗："确定要清除所有游戏数据吗？此操作不可撤销。"

#### Scenario: 确认清除
- GIVEN 确认弹窗已显示
- WHEN 玩家点击"确定"
- THEN 清除 localStorage 中所有游戏相关数据，页面自动刷新回到初始状态

#### Scenario: 取消清除
- GIVEN 确认弹窗已显示
- WHEN 玩家点击"取消"
- THEN 关闭弹窗，不做任何操作

---

## MODIFIED

(None)

---

## REMOVED

(None)
