import blog from '../../../../../../blog'
import ArticleContent from '../../../../../../components/ArticleContent'

export async function generateStaticParams() {
  const yearMonthDayIndices = await blog.getAllYearMonthDayIndices()
  return yearMonthDayIndices.map((ymdi) => ({
    year: ymdi.year.toString(),
    month: ymdi.month.toString(),
    day: ymdi.day.toString(),
    index: ymdi.index.toString(),
  }))
}

interface ArticlePageProps {
  params: Promise<{ year: string; month: string; day: string; index: string }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { year, month, day, index } = await params

  const article = await blog.getArticle({
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
    index: parseInt(index),
  })

  return <ArticleContent article={article} />
}
