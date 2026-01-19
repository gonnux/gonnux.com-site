import ArticleList from '../../../../components/ArticleList'
import blog from '../../../../blog'
import cheerio from 'cheerio'

export async function generateStaticParams() {
  const yearMonths = await blog.getAllYearMonths()
  return yearMonths.map((ym) => ({
    year: ym.year.toString(),
    month: ym.month.toString(),
  }))
}

interface MonthPageProps {
  params: Promise<{ year: string; month: string }>
}

export default async function MonthPage({ params }: MonthPageProps) {
  const { year, month } = await params
  const yearNum = parseInt(year)
  const monthNum = parseInt(month)

  const allIndices = await blog.getAllYearMonthDayIndices()
  const filteredIndices = allIndices.filter(
    (idx) => idx.year === yearNum && idx.month === monthNum
  )

  const articles = (
    await Promise.all(filteredIndices.map(async (index) => blog.getArticle(index)))
  ).map((article) => ({
    ...article,
    content: cheerio.load(article.content).text(),
  }))

  return <ArticleList articles={articles} />
}
