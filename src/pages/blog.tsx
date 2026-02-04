import ArticleList from '../components/ArticleList'
import Layout from '../components/Layout'
import { Article } from '../blog'
import { GetStaticProps, NextLayoutPage } from 'next'

export const getStaticProps: GetStaticProps = async () => {

  const { default: blog } = await import('../blog')
  const { load } = await import('cheerio')

  const articles = (await Promise.all(
    (await blog.getAllYearMonthDayIndices())
      .map(async (index) => blog.getArticle(index)),
  ))
  .map((article) => ({
    ...article,
    content: load(article.content).text(),
  }))

  return {
    props: { articles },
  }
}

const BlogPage: NextLayoutPage<{ articles: [Article]}> = (props) => {
  return (<ArticleList articles={props.articles} />)
}

BlogPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default BlogPage
