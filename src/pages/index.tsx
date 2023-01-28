import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import ArticleList from '../components/ArticleList'
import AppList from '../components/AppList'
import ProjectList from '../components/ProjectList'
import Layout from '../components/Layout'
import { Article } from '../blog'
import { GetStaticProps, NextLayoutPage } from 'next'
import { App, Project } from '../config'

export const getStaticProps: GetStaticProps = async() => {

  const { default: blog } = await import('../blog')
  const { default: cheerio } = await import('cheerio')
  const { default: config } = await import('../config')

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

const IndexPage: NextLayoutPage<{ articles: Article[], apps: App[], projects: Project[]}> = (props) => {
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

IndexPage.getLayout = (page, pageProps) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default IndexPage
