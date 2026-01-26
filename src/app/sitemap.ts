import { MetadataRoute } from 'next'
import blog from '../blog'
import config from '../config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gonnux.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/about`, priority: 0.8 },
    { url: `${baseUrl}/apps`, priority: 0.7 },
    { url: `${baseUrl}/projects`, priority: 0.7 },
    { url: `${baseUrl}/blog`, priority: 0.8 },
  ]

  // Blog articles
  const articles = await blog.getAllYearMonthDayIndices()
  const blogPages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/blog/${a.year}/${String(a.month).padStart(2, '0')}/${String(a.day).padStart(2, '0')}/${a.index}`,
    priority: 0.6,
  }))

  // Projects
  const projectPages: MetadataRoute.Sitemap = config.projects.map((p) => ({
    url: `${baseUrl}/projects/${p.name}`,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages, ...projectPages]
}
