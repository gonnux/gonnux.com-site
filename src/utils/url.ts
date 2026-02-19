import type { Article } from '@/blog'

// 게시글 URL 생성 - slug 기반
export function getArticleUrl(article: Article): string {
  return `/blog/${article.slug}`
}
