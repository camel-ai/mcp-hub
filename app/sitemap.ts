import { MetadataRoute } from 'next';
import { anthropicServers, officialServers } from "@/public/servers";

// 合并所有服务器数据
const serversWithSource = [
  ...anthropicServers.map(server => ({ ...server, source: 'anthropic' })),
  ...officialServers.map(server => ({ ...server, source: 'official' }))
];

// 按名称排序
const allServers = serversWithSource.sort((a, b) =>
  a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
);

// 网站基础URL - 生产环境使用实际域名，开发环境使用localhost
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
               process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
               'https://mcp.camel-ai.org';

// 获取当前日期作为lastModified
const currentDate = new Date();

// 生成sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  // 创建基础页面的sitemap条目
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      // 添加服务器列表页
      url: `${baseUrl}/servers`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ] as MetadataRoute.Sitemap;

  // 为每个服务器创建单独的sitemap条目
  allServers.forEach((server) => {
    routes.push({
      url: `${baseUrl}/servers/${server.key}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // 按来源分类的页面
  routes.push(
    {
      url: `${baseUrl}/servers/source/official`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/servers/source/anthropic`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    }
  );

  return routes;
}
