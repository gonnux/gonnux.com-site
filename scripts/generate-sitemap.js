/**
 * 빌드 타임에 public/sitemap.xml을 생성하는 스크립트.
 *
 * sitemap.xml.tsx의 getServerSideProps는 런타임에 vault 파일을 읽으려 하지만,
 * 프로덕션 Docker 이미지에는 vault 파일이 포함되지 않아 500 에러가 발생했다.
 * 이 스크립트로 빌드 타임에 정적 sitemap을 생성하여 문제를 해결한다.
 *
 * 사용: node scripts/generate-sitemap.js
 * 환경변수: OBSIDIAN_DIR (vault 경로), CONFIG_YAML (config.yaml 경로)
 */

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const matter = require('gray-matter')

const OBSIDIAN_DIR = path.resolve(process.env.OBSIDIAN_DIR ?? 'obsidian')
const CONFIG_YAML = process.env.CONFIG_YAML ?? 'config.yaml'

// config.yaml에서 사이트 URL과 프로젝트 목록을 읽는다
const config = yaml.load(fs.readFileSync(CONFIG_YAML, 'utf8'))
const siteUrl = config.site.url

// vault 디렉토리를 재귀 스캔하여 .md 파일 경로를 반환한다 (blog.ts의 scanVault와 동일 로직)
const EXCLUDE_DIRS = new Set([
  'Templates', '.obsidian', 'Attachments', 'node_modules',
  '.git', '.claude', 'Excalidraw', 'docs', 'private',
])

function scanVault(dir) {
  const results = []
  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!EXCLUDE_DIRS.has(entry.name)) {
          walk(path.join(currentDir, entry.name))
        }
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        results.push(path.join(currentDir, entry.name))
      }
    }
  }
  walk(dir)
  return results
}

// publish: true인 노트의 slug와 created 날짜를 수집한다
const files = scanVault(OBSIDIAN_DIR)
const articles = []

for (const filePath of files) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)
    if (data.publish === true) {
      const slug = path.basename(filePath, '.md')
      let created = data.created
      if (created instanceof Date) {
        created = created.toISOString().slice(0, 10)
      }
      articles.push({ slug, created: created ?? '1970-01-01' })
    }
  } catch {
    // frontmatter 파싱 실패 시 건너뛴다
  }
}

// 정적 페이지
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/blog', priority: '0.8', changefreq: 'daily' },
  { url: '/apps', priority: '0.7', changefreq: 'monthly' },
  { url: '/projects', priority: '0.7', changefreq: 'monthly' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
]

// 블로그 포스트 페이지
const blogPages = articles.map((a) => ({
  url: `/blog/${a.slug}`,
  priority: '0.6',
  changefreq: 'never',
}))

// 연도별 아카이브 페이지
const years = [...new Set(articles.map((a) => a.created.slice(0, 4)))]
const archivePages = years.map((year) => ({
  url: `/blog/archive/${year}`,
  priority: '0.4',
  changefreq: 'monthly',
}))

// 프로젝트 페이지
const projectPages = config.projects.map((project) => ({
  url: `/projects/${project.name}`,
  priority: '0.5',
  changefreq: 'monthly',
}))

const allPages = [...staticPages, ...blogPages, ...archivePages, ...projectPages]

// sitemap XML 생성
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

// public/sitemap.xml에 쓴다
const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
fs.writeFileSync(outputPath, sitemap, 'utf-8')

console.log(`[generate-sitemap] ${allPages.length}개 URL로 sitemap 생성 완료: ${outputPath}`)
