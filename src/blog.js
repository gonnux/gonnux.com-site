const fs = require('fs').promises
const path = require('path')
const marked = require('marked')

async function getYears() {
  return fs.readdir('blog')
}

async function getAllYears() {
  return getYears()
}

async function getMonths({ year }) {
  return fs.readdir(path.resolve('blog', year))
}

async function getDays({ year, month }) {
  return fs.readdir(path.resolve('blog', year, month))
}

async function getIndices({ year, month, day }) {
  return fs.readdir(path.resolve('blog', year, month, day))
}

async function getArticle({
  year, month, day, index,
}) {
  const dir = `blog/${year}/${month}/${day}/${index}`
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
