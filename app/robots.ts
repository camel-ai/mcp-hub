import { MetadataRoute } from 'next';

export const dynamic = 'force-static'

// Base site URL - use actual domain in production, localhost in development
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
          '/api/', // Disallow crawling API paths
          '/_next/', // Disallow crawling Next.js internal paths
          '/static/images/icons/', // Disallow crawling icon files
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
