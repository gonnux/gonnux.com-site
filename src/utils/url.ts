import type { Article, YearMonthDayIndex } from '@/blog'

// 게시글 URL 생성 - 일관된 URL 형식 보장
export function getArticleUrl(article: Article | YearMonthDayIndex): string {
  return `/blog/${article.year}/${article.month}/${article.day}/${article.index}`
}
