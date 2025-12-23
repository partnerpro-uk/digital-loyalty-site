/**
 * Sitemap Generator
 * Generates XML sitemap for all blog posts and pages
 */

import type { APIRoute } from 'astro';
import { client } from '../../sanity/lib/client';

export const GET: APIRoute = async () => {
  // Fetch all published blog posts
  const posts = await client.fetch(`
    *[_type == "blogPost" && status == "published"] {
      slug,
      language,
      publishedAt,
      _updatedAt
    }
  `);

  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/pricing', priority: '0.8', changefreq: 'monthly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' }
  ];

  // Generate URLs for blog posts
  const blogUrls = posts.map((post: { slug: { current: string }; language: string; publishedAt?: string; _updatedAt?: string }) => {
    const baseUrl = post.language === 'en' ? '' : `/${post.language}`;
    return {
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastmod: post._updatedAt || post.publishedAt,
      priority: '0.8',
      changefreq: 'monthly'
    };
  });

  // Combine all URLs
  const allUrls = [...staticPages, ...blogUrls];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>https://digitalloyalty.com${url.url}</loc>
    <lastmod>${url.lastmod ? new Date(url.lastmod).toISOString() : new Date().toISOString()}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};
