import ArticleList from '../components/ArticleList'
import withLayout from '../components/withLayout'

export async function getStaticProps() {
  const cheerio = require('cheerio')
  const blog = require('../blog')
  const articles = (await Promise.all(
    (await blog.getAllIndices())
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

function Blog(props) {
  return (<ArticleList articles={props.articles} />)
}

export default withLayout(Blog)
