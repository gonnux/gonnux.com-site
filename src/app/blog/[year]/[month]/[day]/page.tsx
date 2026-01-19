import ArticleList from '../../../../../components/ArticleList'
import blog from '../../../../../blog'
import cheerio from 'cheerio'

export async function generateStaticParams() {
  const yearMonthDays = await blog.getAllYearMonthDays()
  return yearMonthDays.map((ymd) => ({
    year: ymd.year.toString(),
    month: ymd.month.toString(),
    day: ymd.day.toString(),
  }))
}

interface DayPageProps {
  params: Promise<{ year: string; month: string; day: string }>
}

export default async function DayPage({ params }: DayPageProps) {
  const { year, month, day } = await params
  const yearNum = parseInt(year)
  const monthNum = parseInt(month)
  const dayNum = parseInt(day)

  const allIndices = await blog.getAllYearMonthDayIndices()
  const filteredIndices = allIndices.filter(
    (idx) => idx.year === yearNum && idx.month === monthNum && idx.day === dayNum
  )

  const articles = (
    await Promise.all(filteredIndices.map(async (index) => blog.getArticle(index)))
  ).map((article) => ({
    ...article,
    content: cheerio.load(article.content).text(),
  }))

  return <ArticleList articles={articles} />
}
