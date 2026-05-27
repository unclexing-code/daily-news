<div align="center">

[English](README.en.md) | [中文](README.md)

</div>

# Daily News - Daily News Subscription Platform

A modern daily news subscription platform built with Next.js, using Inngest for scheduled task management and Resend for sending daily news summary emails.

## 🚀 Tech Stack

### Core Framework
- **Next.js 16** - React full-stack framework with App Router and server-side rendering
- **React 19** - Latest version of React UI library
- **TypeScript 5** - Type-safe JavaScript superset

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI component library providing accessible base components
- **shadcn/ui** - Beautiful component collection based on Radix UI and Tailwind CSS
- **Lucide React** - Beautiful and consistent icon library
- **next-themes** - Easy dark/light theme switching

### Backend & Services
- **Inngest** - Serverless function platform and background task queue
  - Scheduled task scheduling (Cron Jobs)
  - Event-driven architecture
  - Reliable asynchronous workflows
- **Resend** - Modern email sending API
  - Broadcast email management
  - User subscription management
  - High delivery rate guarantee

### Tools & Libraries
- **RSS Parser** - RSS feed parsing library for scraping news content
- **Sonner** - Elegant toast notification component
- **ESLint 9** - Code quality checking tool

## ✨ Features

### 📧 Email Subscription System
- User email subscription functionality
- Real-time subscription status feedback (using Sonner Toast)
- Subscriber management

### 📰 News Aggregation
- Multi-RSS source news scraping
- Automatic news summary formatting
- Intelligent content organization

### ⏰ Scheduled Tasks
- Daily news summary delivery (every morning at 4:00 AM)
- Reliable scheduling based on Inngest Cron
- Automated workflows

### 🎨 Modern UI
- Responsive design supporting mobile and desktop
- Clean and elegant user interface
- Smooth interaction experience

## 📦 Project Structure

```
daily/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── inngest/       # Inngest serve handler
│   │   └── subscribe/     # Subscription API
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # UI components
│   └── Card.tsx          # Card component
├── inngest/              # Inngest configuration
│   ├── client.ts         # Inngest client
│   └── function.ts       # Inngest function definitions
├── lib/                  # Utility functions
│   ├── rss_utils.ts      # RSS parsing utilities
│   └── utils.ts          # General utility functions
└── public/               # Static assets
```

## 🛠️ Development Environment Setup

### Prerequisites
- Node.js 18+ 
- npm / yarn / pnpm / bun

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd daily
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Configure environment variables**

Create a `.env.local` file and add the following configuration:

```env
# Resend API Key (get from https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Resend Segment ID (for email list management)
SEGMENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Inngest configuration (optional for development)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

4. **Start development server**

Start Next.js development server:
```bash
npm run dev
```

Start Inngest Dev Server (in a new terminal window):
```bash
npx inngest-cli@latest dev --no-discovery -u http://localhost:3000/api/inngest
```

5. **Access the application**

Open your browser and visit [http://localhost:3000](http://localhost:3000)

View Inngest Dashboard: [http://localhost:8288](http://localhost:8288)

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build production version
npm run start    # Start production server
npm run lint     # Run ESLint checks
```

## 🔧 Core Functionality

### Inngest Scheduled Tasks

The project uses Inngest to implement daily scheduled news email delivery:

```typescript
// inngest/function.ts
export const sendDailyNews = inngest.createFunction(
  { id: "send-daily-email", triggers: { cron: "0 4 * * *" } },
  async ({ event, step }) => {
    // 1. Scrape news
    // 2. Format summary
    // 3. Create email broadcast
    // 4. Send to subscribers
  }
);
```

### RSS News Scraping

Uses the `rss-parser` library to scrape news content from multiple RSS sources and format it into HTML email templates.

### Email Sending Workflow

1. Users subscribe through the homepage form
2. Subscription information is saved to Resend contact list
3. Scheduled task triggers daily at 4:00 AM
4. Automatically scrapes latest news and generates summaries
5. Sends to all subscribers via Resend Broadcasts

## 🚀 Deployment Guide

### Vercel Deployment (Recommended)

1. Push code to GitHub/GitLab/Bitbucket
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. One-click deployment

### Environment Variable Configuration

The following variables need to be configured in production:

- `RESEND_API_KEY` - Resend API key
- `SEGMENT_ID` - Resend audience segment ID
- `INNGEST_EVENT_KEY` - Inngest event key
- `INNGEST_SIGNING_KEY` - Inngest signing key

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Inngest Documentation](https://www.inngest.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/)

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📄 License

MIT License

---

Made with ❤️ using Next.js, Inngest, and Resend
