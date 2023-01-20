import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import ArticleList from '../components/ArticleList'
import AppList from '../components/AppList'
import ProjectList from '../components/ProjectList'
import withLayout from '../components/withLayout'
import blog, { Article } from '../blog'
import { GetStaticProps, NextPage } from 'next'
import { App, Project } from '../config'
import config from '../config'
import cheerio from 'cheerio'

export const getStaticProps: GetStaticProps = async() => {
  const articles = (
    await Promise.all(
      (await blog.getAllYearMonthDayIndices())
      .map(async (index) => blog.getArticle(index)),
  ))
    .map((article) => ({
      ...article,
      content: cheerio.load(article.content).text(),
    }))

  const { apps, projects } = config

  return {
    props: { articles, apps, projects },
  }
}

const IndexPage: NextPage<{ articles: Article[], apps: App[], projects: Project[]}> = (props) => {
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

export default withLayout(IndexPage)
