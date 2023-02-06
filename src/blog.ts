import { promises as fs } from 'fs'
import path from 'path'
import { marked } from 'marked'

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
    month.toString().padStart(2, '0')
  )))
  .filter((day) => DAY_REGEX.test(day))
  .map((day) => parseInt(day))
}

async function getIndices({ year, month, day }: YearMonthDay): Promise<number[]> {
  return (await fs.readdir(path.resolve(
    BLOG_DIR,
    year.toString(),
    month.toString().padStart(2, '0'),
    day.toString().padStart(2, '0')
  )))
  .filter((index) => INDEX_REGEX.test(index))
  .map((index) => parseInt(index))
}

async function getArticle({
  year, month, day, index,
}: YearMonthDayIndex): Promise<Article> {
  const dir = path.resolve(
    BLOG_DIR,
    year.toString(),
    month.toString().padStart(2, '0'),
    day.toString().padStart(2, '0'),
    index.toString()
  )
  const file = (await fs.readdir(dir))[0]
  const title = path.parse(file).name
  const content = await fs
    .readFile(path.resolve(dir, file), 'utf8')
    .then((bytes) => marked(bytes))
  return {
    year,
    month,
    day,
    index,
    title,
    content,
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

// NOT IMPLEMENTED
async function getLatestArticles(count: number) {
  return count
}

export interface Article {
  year: number,
  month: number,
  day: number,
  index: number,
  title: string,
  content: string
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
  getLatestArticles,
}

export default Blog
