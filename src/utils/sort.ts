import { Article, YearMonthDayIndex } from '@/blog'

// 게시글을 최신순으로 정렬 (년 > 월 > 일 > 인덱스)
export function compareArticlesDesc(a: Article | YearMonthDayIndex, b: Article | YearMonthDayIndex): number {
  if (a.year !== b.year) return b.year - a.year
  if (a.month !== b.month) return b.month - a.month
  if (a.day !== b.day) return b.day - a.day
  if (a.index !== b.index) return b.index - a.index
  return 0
}
