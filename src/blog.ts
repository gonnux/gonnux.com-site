import { promises as fs } from 'fs'
import path from 'path'
import marked from './marked'
import { padTwo } from './utils/date'

const YEAR_REGEX = /^\d+$/
const MONTH_REGEX = /^\d\d$/
const DAY_REGEX = /^\d\d$/
const INDEX_REGEX = /^\d+$/
const BLOG_DIR = path.resolve(process.env.BLOG_DIR ?? 'blog')

async function getYears(): Promise<number[]> {
  return (await fs.readdir(BLOG_DIR))
  .filter(YEAR_REGEX.test.bind(YEAR_REGEX))
  .map((year) => parseInt(year))
}

const getAllYears = getYears

async function getMonths({ year }: { year: number }): Promise<number[]> {
  return (await fs.readdir(path.resolve(
    BLOG_DIR,
    year.toString()
  )))
  .filter((month) => MONTH_REGEX.test(month))
  .map((month) => parseInt(month))
}

async function getDays({ year , month }: YearMonth): Promise<number[]> {
  return (await fs.readdir(path.resolve(
    BLOG_DIR,
    year.toString(),
    padTwo(month)
  )))
  .filter((day) => DAY_REGEX.test(day))
  .map((day) => parseInt(day))
}

async function getIndices({ year, month, day }: YearMonthDay): Promise<number[]> {
  return (await fs.readdir(path.resolve(
    BLOG_DIR,
    year.toString(),
    padTwo(month),
    padTwo(day)
  )))
  .filter((index) => INDEX_REGEX.test(index))
  .map((index) => parseInt(index))
}

// HTML 태그를 제거하고 텍스트만 추출하는 헬퍼 함수
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

// 게시글 요약 생성 - SEO description에 사용
function createExcerpt(content: string, maxLength: number = 150): string {
  const text = stripHtml(content)
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength).trim() + '...'
}

async function getArticle({
  year, month, day, index,
}: YearMonthDayIndex): Promise<Article> {
  const dir = path.resolve(
    BLOG_DIR,
    year.toString(),
    padTwo(month),
    padTwo(day),
    index.toString()
  )
  const file = (await fs.readdir(dir))[0]
  const title = path.parse(file).name
  const text = await fs.readFile(path.resolve(dir, file), 'utf8')
  const content = await marked.parse(text)
  const excerpt = createExcerpt(content)
  return {
    year,
    month,
    day,
    index,
    title,
    content,
    excerpt,
  }
}

async function getAllYearMonths(): Promise<YearMonth[]> {
  const years = await getAllYears()
  const months = (await Promise.all(
    years.map(async (year) => (await getMonths({ year })).map((month) => ({ year, month }))),
  ))
  .flat()
  return months
}

async function getAllYearMonthDays(): Promise<YearMonthDay[]> {
  const yearMonths = await getAllYearMonths()
  const days = (await Promise.all(
    yearMonths.map(async (yearMonth) => (
      await getDays(yearMonth))
      .map((day) => ({ ...yearMonth, day }))),
  )).flat()
  return days
}

async function getAllYearMonthDayIndices(): Promise<YearMonthDayIndex[]> {
  const days = await getAllYearMonthDays()
  const indices = (await Promise.all(
    days
    .map(async (day) => (await getIndices(day))
      .map((index) => ({
        ...day, index,
      }))),
  )).flat()
  return indices
}

export interface Article {
  year: number,
  month: number,
  day: number,
  index: number,
  title: string,
  content: string,
  excerpt: string  // SEO description에 사용할 요약
}

export interface YearMonth {
  year: number,
  month: number
}

export interface YearMonthDay extends YearMonth {
  day: number 
}

export interface YearMonthDayIndex extends YearMonthDay {
  index: number
}

const Blog = {
  getYears,
  getMonths,
  getDays,
  getIndices,
  getArticle,
  getAllYears,
  getAllYearMonths,
  getAllYearMonthDays,
  getAllYearMonthDayIndices,
}

export default Blog
