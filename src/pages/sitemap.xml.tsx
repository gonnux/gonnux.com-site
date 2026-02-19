import type { GetServerSideProps } from 'next'
import { getAllArticles } from '@/blog'
import config from '@/config'

const Sitemap = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const siteUrl = config.site.url

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
    { url: '/apps', priority: '0.7', changefreq: 'monthly' },
    { url: '/projects', priority: '0.7', changefreq: 'monthly' },
    { url: '/about', priority: '0.6', changefreq: 'monthly' },
  ]

  // slug 기반 블로그 포스트 URL
  const articles = await getAllArticles()
  const blogPages = articles.map((article) => ({
    url: `/blog/${article.slug}`,
    priority: '0.6',
    changefreq: 'never' as const,
  }))

  // 연도별 아카이브 페이지
  const years = [...new Set(articles.map((a) => a.created.slice(0, 4)))]
  const archivePages = years.map((year) => ({
    url: `/blog/archive/${year}`,
    priority: '0.4',
    changefreq: 'monthly' as const,
  }))

  const projectPages = config.projects.map((project) => ({
    url: `/projects/${project.name}`,
    priority: '0.5',
    changefreq: 'monthly' as const,
  }))

  const allPages = [...staticPages, ...blogPages, ...archivePages, ...projectPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default Sitemap
