import ArticleList from '../../../components/ArticleList'
import blog from '../../../blog'
import cheerio from 'cheerio'

export async function generateStaticParams() {
  const years = await blog.getAllYears()
  return years.map((year) => ({
    year: year.toString(),
  }))
}

interface YearPageProps {
  params: Promise<{ year: string }>
}

export default async function YearPage({ params }: YearPageProps) {
  const { year } = await params
  const yearNum = parseInt(year)

  const allIndices = await blog.getAllYearMonthDayIndices()
  const filteredIndices = allIndices.filter((idx) => idx.year === yearNum)

  const articles = (
    await Promise.all(filteredIndices.map(async (index) => blog.getArticle(index)))
  ).map((article) => ({
    ...article,
    content: cheerio.load(article.content).text(),
  }))

  return <ArticleList articles={articles} />
}
