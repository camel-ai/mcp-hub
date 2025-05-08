import { MetadataRoute } from 'next';

// 网站基础URL - 生产环境使用实际域名，开发环境使用localhost
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
               process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
               'https://mcp.camel-ai.org';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', // 禁止爬取API路径
          '/_next/', // 禁止爬取Next.js内部路径
          '/static/images/icons/', // 禁止爬取图标文件
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
