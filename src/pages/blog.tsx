import ArticleList from '../components/ArticleList'
import withLayout from '../components/withLayout'
import { Article } from '../blog'
import { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps = async () => {

  const { default: blog } = await import('../blog')
  const { default: cheerio } = await import('cheerio')

  const articles = (await Promise.all(
    (await blog.getAllYearMonthDayIndices())
      .map(async (index) => blog.getArticle(index)),
  ))
  .map((article) => ({
    ...article,
    content: cheerio.load(article.content).text(),
  }))

  return {
    props: { articles },
  }
}

const Blog: NextPage<{ articles: [Article]}> = (props) => {
  return (<ArticleList articles={props.articles} />)
}

export default withLayout(Blog)
