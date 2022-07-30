const fs = require('fs').promises
const path = require('path')
const { marked } = require('marked')

const YEAR_REGEX = /^\d+$/
const MONTH_REGEX = /^\d\d$/
const DAY_REGEX = /^\d\d$/
const INDEX_REGEX = /^\d+$/
const BLOG_DIR = path.resolve(process.env.BLOG_DIR ?? 'blog') 

async function getYears() {
  return (await fs.readdir(BLOG_DIR))
    .filter((entry) => YEAR_REGEX.test(entry))
}

const getAllYears = getYears

async function getMonths({ year }) {
  return (await fs.readdir(path.resolve(BLOG_DIR, year)))
    .filter((entry) => MONTH_REGEX.test(entry))
}

async function getDays({ year, month }) {
  return (await fs.readdir(path.resolve(BLOG_DIR, year, month)))
    .filter((entry) => DAY_REGEX.test(entry))
}

async function getIndices({ year, month, day }) {
  return (await fs.readdir(path.resolve(BLOG_DIR, year, month, day)))
    .filter((entry) => INDEX_REGEX.test(entry))
}

async function getArticle({
  year, month, day, index,
}) {
  const dir = path.resolve(BLOG_DIR, year, month, day, index)
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

async function getAllMonths() {
  const years = await getAllYears()
  const months = (await Promise.all(
    years.map(async (year) => (await getMonths({ year })).map((month) => ({ year, month }))),
  )).flat()
  return months
}

async function getAllDays() {
  const months = await getAllMonths()
  const days = (await Promise.all(
    months.map(async (month) => (
      await getDays({ year: month.year, month: month.month }))
      .map((day) => ({ year: month.year, month: month.month, day }))),
  )).flat()
  return days
}

async function getAllIndices() {
  const days = await getAllDays()
  const indices = (await Promise.all(
    days.map(async (day) => (await getIndices({ year: day.year, month: day.month, day: day.day }))
      .map((index) => ({
        year: day.year, month: day.month, day: day.day, index,
      }))),
  )).flat()
  return indices
}

async function getLatestArticles(count) {
  return count
}

module.exports = {
  getYears,
  getMonths,
  getDays,
  getIndices,
  getArticle,
  getAllYears,
  getAllMonths,
  getAllDays,
  getAllIndices,
  getLatestArticles,
}
