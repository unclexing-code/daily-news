<div align="center">

[English](README.en.md) | [中文](README.md)

</div>

# Daily News - 每日新闻订阅平台

一个基于 Next.js 构建的现代化每日新闻订阅平台，使用 Inngest 实现定时任务调度，通过 Resend 发送每日新闻摘要邮件。

## 🚀 技术栈

### 核心框架
- **Next.js 16** - React 全栈框架，支持 App Router 和服务端渲染
- **React 19** - 最新版本的 React UI 库
- **TypeScript 5** - 类型安全的 JavaScript 超集

### 样式与 UI
- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **Radix UI** - 无头 UI 组件库，提供可访问的基础组件
- **shadcn/ui** - 基于 Radix UI 和 Tailwind CSS 的精美组件集合
- **Lucide React** - 美观且一致的图标库
- **next-themes** - 轻松实现明暗主题切换

### 后端与服务
- **Inngest** - 无服务器函数平台和背景任务队列
  - 定时任务调度（Cron Jobs）
  - 事件驱动架构
  - 可靠的异步工作流
- **Resend** - 现代化的邮件发送 API
  - 广播邮件管理
  - 用户订阅管理
  - 高送达率保证

### 工具与库
- **RSS Parser** - RSS 源解析库，用于抓取新闻内容
- **Sonner** - 优雅的 toast 通知组件
- **ESLint 9** - 代码质量检查工具

## ✨ 功能特性

### 📧 邮件订阅系统
- 用户邮箱订阅功能
- 实时订阅状态反馈（使用 Sonner Toast）
- 订阅用户管理

### 📰 新闻聚合
- 多 RSS 源新闻抓取
- 自动格式化新闻摘要
- 智能内容整理

### ⏰ 定时任务
- 每日定时发送新闻摘要（每天早上 4:00）
- 基于 Inngest Cron 的可靠调度
- 自动化工作流程

### 🎨 现代化 UI
- 响应式设计，支持移动端和桌面端
- 简洁优雅的用户界面
- 流畅的交互体验

## 📦 项目结构

```
daily/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   ├── inngest/       # Inngest serve handler
│   │   └── subscribe/     # 订阅 API
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页
├── components/            # React 组件
│   ├── ui/               # UI 组件
│   └── Card.tsx          # 卡片组件
├── inngest/              # Inngest 配置
│   ├── client.ts         # Inngest 客户端
│   └── function.ts       # Inngest 函数定义
├── lib/                  # 工具函数
│   ├── rss_utils.ts      # RSS 解析工具
│   └── utils.ts          # 通用工具函数
└── public/               # 静态资源
```

## 🛠️ 开发环境搭建

### 前置要求
- Node.js 18+ 
- npm / yarn / pnpm / bun

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd daily
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
# 或
pnpm install
# 或
bun install
```

3. **配置环境变量**

创建 `.env.local` 文件并添加以下配置：

```env
# Resend API Key (从 https://resend.com 获取)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Resend Segment ID (用于邮件列表管理)
SEGMENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Inngest 配置（开发环境可选）
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

4. **启动开发服务器**

启动 Next.js 开发服务器：
```bash
npm run dev
```

启动 Inngest Dev Server（新终端窗口）：
```bash
npx inngest-cli@latest dev --no-discovery -u http://localhost:3000/api/inngest
```

5. **访问应用**

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

查看 Inngest Dashboard: [http://localhost:8288](http://localhost:8288)

## 📝 可用脚本

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run start    # 启动生产服务器
npm run lint     # 运行 ESLint 检查
```

## 🔧 核心功能说明

### Inngest 定时任务

项目使用 Inngest 实现每日定时发送新闻邮件：

```typescript
// inngest/function.ts
export const sendDailyNews = inngest.createFunction(
  { id: "send-daily-email", triggers: { cron: "0 4 * * *" } },
  async ({ event, step }) => {
    // 1. 抓取新闻
    // 2. 格式化摘要
    // 3. 创建邮件广播
    // 4. 发送给订阅用户
  }
);
```

### RSS 新闻抓取

使用 `rss-parser` 库从多个 RSS 源抓取新闻内容，并格式化为 HTML 邮件模板。

### 邮件发送流程

1. 用户通过首页表单订阅
2. 订阅信息保存到 Resend 联系人列表
3. 每日凌晨 4 点触发定时任务
4. 自动抓取最新新闻并生成摘要
5. 通过 Resend Broadcasts 发送给所有订阅者

## 🚀 部署指南

### Vercel 部署（推荐）

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 一键部署

### 环境变量配置

在生产环境需要配置以下变量：

- `RESEND_API_KEY` - Resend API 密钥
- `SEGMENT_ID` - Resend 受众群体 ID
- `INNGEST_EVENT_KEY` - Inngest 事件密钥
- `INNGEST_SIGNING_KEY` - Inngest 签名密钥

## 📚 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [Inngest 文档](https://www.inngest.com/docs)
- [Resend 文档](https://resend.com/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Radix UI 文档](https://www.radix-ui.com/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

Made with ❤️ using Next.js, Inngest, and Resend