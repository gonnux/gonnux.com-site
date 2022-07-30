import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import ArticleList from '../components/ArticleList'
import AppList from '../components/AppList'
import ProjectList from '../components/ProjectList'
import withLayout from '../components/withLayout'
import { DATA_YAML } from '../constants'

export async function getStaticProps() {
  const yaml = require('js-yaml')
  const fs = require('fs')
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

  const { apps, projects } = yaml.safeLoad(fs.readFileSync(DATA_YAML, 'utf8'))

  return {
    props: { articles, apps, projects },
  }
}

function Index(props) {
  return (
    <>
      <Typography variant="h5">Apps</Typography>
      <AppList apps={props.apps} />
      <Divider />
      <Typography variant="h5">Projects</Typography>
      <ProjectList projects={props.projects} />
      <Divider />
      <Typography variant="h5">Articles</Typography>
      <ArticleList articles={props.articles} />
    </>
  )
}

export default withLayout(Index)
