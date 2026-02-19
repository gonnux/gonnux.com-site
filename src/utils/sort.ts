import type { Article } from '@/blog'

// 게시글을 최신순으로 정렬 (created 날짜 기준)
export function compareArticlesDesc(a: Article, b: Article): number {
  return b.created.localeCompare(a.created)
}
