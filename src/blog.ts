import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import marked from './marked'
import { transformObsidianMarkdown } from './obsidian'

// OBSIDIAN_DIR 환경변수: vault 디렉토리 경로
const OBSIDIAN_DIR = path.resolve(process.env.OBSIDIAN_DIR ?? 'obsidian')

export interface Article {
  slug: string       // 파일명 (확장자 제외, URL 경로로 사용)
  title: string      // 첫 번째 # 제목 또는 파일명
  created: string    // frontmatter created (YYYY-MM-DD)
  type: string       // frontmatter type (literature, permanent 등)
  tags: string[]     // frontmatter tags
  content: string    // 렌더링된 HTML
  excerpt: string    // 150자 미리보기
}

/**
 * HTML 태그를 제거한다.
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

/**
 * HTML에서 150자 미리보기를 추출한다.
 */
function createExcerpt(html: string, maxLength: number = 150): string {
  const text = stripHtml(html)
  return text.length > maxLength ? text.slice(0, maxLength).trim() + '...' : text
}

/**
 * 마크다운 본문에서 첫 번째 # 제목을 추출한다.
 * 없으면 파일명을 반환한다.
 */
function extractTitle(content: string, slug: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : slug
}

/**
 * frontmatter의 created 값을 YYYY-MM-DD 문자열로 변환한다.
 * gray-matter는 YYYY-MM-DD 형식의 값을 자동으로 Date 객체로 파싱하므로,
 * Date 객체인 경우 문자열로 변환해야 한다.
 */
function formatCreated(value: unknown): string {
  if (value instanceof Date) {
    // Date 객체를 UTC 기준 YYYY-MM-DD로 변환
    // (gray-matter가 파싱한 Date는 UTC 자정이므로 UTC 메서드 사용)
    const year = value.getUTCFullYear()
    const month = String(value.getUTCMonth() + 1).padStart(2, '0')
    const day = String(value.getUTCDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  if (typeof value === 'string') {
    return value
  }
  return '1970-01-01'
}

/**
 * vault 디렉토리를 재귀 스캔하여 모든 .md 파일 경로를 반환한다.
 * Templates, .obsidian, Attachments, node_modules, .git 등은 제외.
 */
function scanVault(dir: string): string[] {
  const EXCLUDE_DIRS = new Set([
    'Templates', '.obsidian', 'Attachments', 'node_modules',
    '.git', '.claude', 'Excalidraw', 'docs', 'private',
  ])

  const results: string[] = []

  function walk(currentDir: string) {
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

/**
 * publish: true인 모든 노트의 slug Set을 반환한다.
 * wiki-link 변환 시 어떤 링크가 유효한지 판단하는 데 사용.
 */
function getPublishedSlugs(): Set<string> {
  const files = scanVault(OBSIDIAN_DIR)
  const slugs = new Set<string>()

  for (const filePath of files) {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(raw)
      if (data.publish === true) {
        const slug = path.basename(filePath, '.md')
        slugs.add(slug)
      }
    } catch {
      // frontmatter 파싱 실패 시 해당 노트를 건너뛴다.
      // vault 노트 중 YAML 문법에 맞지 않는 frontmatter가 있을 수 있다.
      console.warn(`[blog] frontmatter 파싱 실패, 건너뜀: ${filePath}`)
    }
  }

  return slugs
}

/**
 * publish: true인 모든 Article 목록을 반환한다.
 * created 날짜 역순 정렬.
 */
export async function getAllArticles(): Promise<Article[]> {
  const files = scanVault(OBSIDIAN_DIR)
  const publishedSlugs = getPublishedSlugs()
  const articles: Article[] = []

  for (const filePath of files) {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(raw)

      if (data.publish !== true) continue

      const slug = path.basename(filePath, '.md')
      const transformed = transformObsidianMarkdown(raw, publishedSlugs)
      const html = await marked.parse(transformed)
      const title = extractTitle(transformed, slug)

      articles.push({
        slug,
        title,
        created: formatCreated(data.created),
        type: data.type ?? 'unknown',
        tags: data.tags ?? [],
        content: html,
        excerpt: createExcerpt(html),
      })
    } catch {
      // frontmatter 파싱 실패 시 해당 노트를 건너뛴다.
      console.warn(`[blog] 노트 처리 실패, 건너뜀: ${filePath}`)
    }
  }

  // created 날짜 역순 정렬
  articles.sort((a, b) => b.created.localeCompare(a.created))
  return articles
}

/**
 * slug로 특정 Article을 반환한다.
 */
export async function getArticle(slug: string): Promise<Article | null> {
  const articles = await getAllArticles()
  return articles.find((a) => a.slug === slug) ?? null
}

/**
 * 모든 publish된 slug 목록을 반환한다. (getStaticPaths용)
 */
export async function getAllSlugs(): Promise<string[]> {
  const articles = await getAllArticles()
  return articles.map((a) => a.slug)
}
