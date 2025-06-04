import { MetadataRoute } from 'next';
import { anthropicServers, officialServers, camelServers, communityServers } from "@/public/servers";

export const dynamic = 'force-static'

// Merge all server data
const serversWithSource = [
  ...anthropicServers.map(server => ({ ...server, source: 'anthropic' })),
  ...officialServers.map(server => ({ ...server, source: 'official' })),
  ...camelServers.map(server => ({ ...server, source: 'camel' })),
  ...communityServers.map(server => ({ ...server, source: 'community' }))
];

// Sort by name
const allServers = serversWithSource.sort((a, b) =>
  a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
);

// Base site URL - use actual domain in production, localhost in development
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
               process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
               'https://mcp.camel-ai.org';

// Get current date as lastModified
const currentDate = new Date();

// Generate sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  // Create sitemap entries for base pages
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      // Add server list page
      url: `${baseUrl}/servers`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ] as MetadataRoute.Sitemap;

  // Create individual sitemap entries for each server
  allServers.forEach((server) => {
    routes.push({
      url: `${baseUrl}/servers/${server.key}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Pages categorized by source
  routes.push(
    {
      url: `${baseUrl}/?filter=official`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/?filter=anthropic`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/?filter=camel`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/?filter=community`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    }
  );

  return routes;
}
