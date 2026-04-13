# Proposal: Detective Web Game (推理解谜网页游戏)

**Change ID:** `detective-web-game`
**Created:** 2026-04-13
**Status:** Draft

---

## Problem Statement

- 需要开发一款基于网页的推理解谜游戏，模拟手机界面，玩家通过翻阅各种APP（论坛、微信、购物App等）中的线索进行推理
- 游戏包含两个阶段：锁定被害人是自己（13条线索）→ 锁定发帖人是未来的自己（10条线索）
- 最终部署到 GitHub Pages

## Proposed Solution

- 使用 React + TypeScript 构建单页应用（SPA）
- 模拟手机界面，包含多个可交互的APP
- 使用 React Router 管理APP间导航
- 使用 Zustand 管理游戏状态（线索解锁、进度追踪）
- 使用 Vite 构建，部署到 GitHub Pages
- 纯前端项目，无后端依赖

## Scope

### In Scope
- 手机模拟器外壳（状态栏、主屏幕、APP图标）
- 6个游戏内APP：树洞论坛、学校官网（含校园地图）、微信、外卖/购物App、设置、内置EXIF解析
- 所有APP仿iOS端风格设计
- 完整推理流程内容（第一阶段13条线索 + 第二阶段10条线索 + 密码环节）
- localStorage 保存关键状态（论坛登录、管理员聊天解锁、帖子恢复）
- 设置APP（仿iOS风格）提供清除游戏数据功能
- 响应式设计（屏幕宽度>500px显示居中手机模拟器外壳，<=500px不显示外壳直接全屏展示内容）
- GitHub Pages 部署配置

### Out of Scope
- 后端服务 / 数据库
- 用户账号系统
- 多语言支持（仅中文）
- 音效 / 背景音乐（首版不含）
- 排行榜 / 社交分享

## Impact Analysis

| Component | Change Required | Details |
|-----------|-----------------|---------|
| Database | No | 纯前端，使用 localStorage |
| API | No | 无后端 |
| State | Yes | Zustand 管理论坛登录状态、管理员聊天解锁、帖子恢复状态，持久化到 localStorage |
| UI | Yes | 手机模拟器 + 6个仿iOS风格APP的完整界面 |

## Architecture Considerations

### 技术栈
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **状态管理**: Zustand
- **路由**: React Router v6
- **样式**: Tailwind CSS（适合快速构建手机UI）
- **部署**: GitHub Pages（通过 GitHub Actions 自动部署）

### 项目结构
```
src/
├── components/
│   ├── Phone/              # 手机模拟器外壳
│   │   ├── PhoneFrame.tsx  # 手机边框、状态栏
│   │   ├── HomeScreen.tsx  # 主屏幕、APP图标
│   │   └── StatusBar.tsx   # 时间、电量等
│   ├── apps/               # 各个APP组件（全部仿iOS端风格）
│   │   ├── TreeHole/       # 树洞论坛
│   │   ├── SchoolWeb/      # 学校官网（含校园地图）
│   │   ├── WeChat/         # 微信（聊天+朋友圈）
│   │   ├── Shopping/       # 外卖/购物App
│   │   ├── Settings/       # 设置（仿iOS，清除数据）
│   │   └── ExifViewer/     # EXIF解析（内置于图片查看）
│   └── shared/             # 共享组件
│       ├── ImageViewer.tsx  # 图片查看器（含EXIF按钮）
│       └── InputDialog.tsx # 输入对话框
├── store/
│   └── gameStore.ts        # 游戏状态（论坛登录、管理员解锁、帖子恢复）
├── data/
│   ├── clues.ts            # 24条线索定义
│   ├── treehole.ts         # 论坛帖子数据
│   ├── wechat.ts           # 微信聊天/朋友圈数据
│   ├── shopping.ts         # 购物/外卖数据
│   └── campus.ts           # 校园地图/官网数据
├── hooks/
│   └── useClue.ts          # 线索触发逻辑
├── App.tsx
└── main.tsx
```

### 核心设计模式
- **最小状态持久化**: 仅保存3个布尔值到 localStorage（论坛登录、管理员解锁、帖子恢复），不做复杂的进度追踪
- **条件显示**: 论坛登录后才显示隐藏帖子；访问帖子二后才在微信中显示管理员聊天；管理员恢复后帖子二显示完整内容
- **自由探索**: 玩家可自由翻阅所有APP内容，无线性引导，自行发现线索

## Success Criteria

- [ ] 玩家可以在手机模拟器中自由切换6个APP
- [ ] 24条线索全部可通过交互触发和解锁
- [ ] 第一阶段结束时玩家能确认被拍摄者是自己
- [ ] 第二阶段结束时玩家读到独白，故事戛然而止
- [ ] 游戏进度可保存/读取（刷新不丢失）
- [ ] 成功部署到 GitHub Pages 并可在线访问
- [ ] 移动端和桌面端均可正常游玩

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| 微信聊天界面复杂度高 | High | Med | 先实现核心功能，逐步完善细节 |
| 线索触发逻辑复杂 | Med | High | 用状态机管理，每条线索定义清晰的触发条件 |
| 手机模拟器适配问题 | Med | Med | 使用固定宽高比，桌面端居中显示 |
| 游戏流程卡住（玩家不知道下一步） | Med | High | 预留提示系统接口（可后续添加） |
| 图片资源体积过大 | Low | Med | 使用压缩图片，关键图片懒加载 |
