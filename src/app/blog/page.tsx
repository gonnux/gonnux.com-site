import ArticleList from '../../components/ArticleList'
import blog from '../../blog'
import cheerio from 'cheerio'

export default async function BlogPage() {
  const articles = (
    await Promise.all(
      (await blog.getAllYearMonthDayIndices()).map(async (index) =>
        blog.getArticle(index)
      )
    )
  ).map((article) => ({
    ...article,
    content: cheerio.load(article.content).text(),
  }))

  return <ArticleList articles={articles} />
}
