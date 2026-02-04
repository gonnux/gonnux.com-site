import Box from '@mui/material/Box'
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
  const { load } = await import('cheerio')
  const { default: config } = await import('../config')

  const articles = (
    await Promise.all(
      (await blog.getAllYearMonthDayIndices())
      .map(async (index) => blog.getArticle(index)),
    )
  )
  .map((article) => ({
    ...article,
    content: load(article.content).text(),
  }))

  const { apps, projects } = config

  return {
    props: { articles, apps, projects },
  }
}

const IndexPage: NextLayoutPage<{ articles: Article[], apps: App[], projects: Project[]}> = (props) => {
  return (
    <>
      <Box component="section">
        <Box component="header">
          <Typography variant="h5">Apps</Typography>
        </Box>
        <AppList apps={props.apps} />
      </Box>
      <Divider />
      <Box component="section">
        <Box component="header">
          <Typography variant="h5">Projects</Typography>
        </Box>
        <ProjectList projects={props.projects} />
      </Box>
      <Divider />
      <Box component="section">
        <Box component="header">
          <Typography variant="h5">Articles</Typography>
        </Box>
        <ArticleList articles={props.articles} />
      </Box>
    </>
  )
}

IndexPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default IndexPage
