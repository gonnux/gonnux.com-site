import type { GetServerSideProps } from 'next'
import Blog from '@/blog'
import config from '@/config'
import { padTwo } from '@/utils/date'

// Empty component - XML is returned via getServerSideProps
const Sitemap = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const siteUrl = config.site.url

  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
    { url: '/apps', priority: '0.7', changefreq: 'monthly' },
    { url: '/projects', priority: '0.7', changefreq: 'monthly' },
    { url: '/about', priority: '0.6', changefreq: 'monthly' },
  ]

  // Dynamic blog posts
  const allArticles = await Blog.getAllYearMonthDayIndices()
  const blogPages = allArticles.map(({ year, month, day, index }) => ({
    url: `/blog/${year}/${padTwo(month)}/${padTwo(day)}/${index}`,
    priority: '0.6',
    changefreq: 'never',
  }))

  // Project pages
  const projectPages = config.projects.map((project) => ({
    url: `/projects/${project.name}`,
    priority: '0.5',
    changefreq: 'monthly',
  }))

  const allPages = [...staticPages, ...blogPages, ...projectPages]

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
