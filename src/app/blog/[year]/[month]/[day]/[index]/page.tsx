import { Metadata } from 'next'
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

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { year, month, day, index } = await params
  const article = await blog.getArticle({
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
    index: parseInt(index),
  })

  const url = `https://gonnux.com/blog/${year}/${month}/${day}/${index}`

  return {
    title: article.title,
    description: `${article.title} - gonnux.com blog`,
    openGraph: {
      type: 'article',
      title: article.title,
      url,
      publishedTime: `${year}-${month}-${day}`,
    },
    alternates: { canonical: url },
  }
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
