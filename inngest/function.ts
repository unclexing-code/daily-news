// src/inngest/functions.ts
import { fetchAllNews, formatNewsSummary } from "@/lib/rss_utils";
import { inngest } from "./client";
import { Resend } from "resend";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "app/task.created" } },
  async ({ event, step }) => {
    const result = await step.run("handle-task", async () => {
      return { processed: true, id: event.data.id };
    });

    await step.sleep("pause", "1s");

    return { message: `Task ${event.data.id} complete`, result };
  },
);

export const sendDailyNews = inngest.createFunction(
  { id: "send-daily-email", triggers: { cron: "0 4 * * *" } },
  async ({ event, step }) => {
    // 从多个rss源获取新闻
    const newsItmes = await step.run("fetch-news", async () => {
      // 这里可以使用rss-parser等库来解析rss源
      console.log("fetching news...");
      const news = await fetchAllNews();
      console.log("news fetched:", news.length);
      return news;
    });
    // 整理新闻为每日摘要
    const newsSummary = await step.run("format-news", () => {
      console.log("formatting news...");
      const summary = formatNewsSummary(newsItmes);
      console.log("news formatted:", summary);
      return summary;
    });
    // 创建邮件内容
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const { data, error } = await step.run("create-email", async () => {
      console.log("sending email...");
      const result = await resend.broadcasts.create({
        from: "Daily News <onboarding@webjianghuzhi.com>",
        segmentId: process.env.SEGMENT_ID!,
        subject:
          `"Daily News - ${new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}"`,
        html: newsSummary.html,
      });
      return result;
    });
    if (error) {
      console.log("send email error:", error);
    }
    // 发送邮件给订阅用户
    const { error: sendError } = await step.run(
      "send-email",
      async () => {
        console.log("sending email");
        const result = await resend.broadcasts.send(data?.id!);
        return result;
      },
    );
    if (sendError) {
      console.log("send email error:", sendError);
    }
  }
);
  