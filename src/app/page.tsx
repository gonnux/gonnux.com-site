import blog from '../blog'
import config from '../config'
import cheerio from 'cheerio'
import HomeContent from '../components/HomeContent'

export const dynamic = 'force-static'

export default async function HomePage() {
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

  const { apps, projects } = config

  return <HomeContent articles={articles} apps={apps} projects={projects} />
}
