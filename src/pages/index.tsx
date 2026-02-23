import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import ArticleList from '@/components/ArticleList'
import AppList from '@/components/AppList'
import ProjectList from '@/components/ProjectList'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'
import type { Article } from '@/blog'
import type { GetStaticProps } from 'next'
import type { NextLayoutPage } from '@/types/layout'
import type { App, Project, Site } from '@/config'

export const getStaticProps: GetStaticProps = async() => {
  const { getAllArticles } = await import('@/blog')
  const { default: config } = await import('@/config')

  // 최신 5개만 홈페이지에 표시
  const articles = (await getAllArticles()).slice(0, 5)
  const { site, apps, projects } = config

  return {
    props: { site, articles, apps, projects },
    revalidate: 3600,
  }
}

const IndexPage: NextLayoutPage<{ site: Site, articles: Article[], apps: App[], projects: Project[]}> = (props) => {
  return (
    <>
      <SEO site={props.site} canonical="/" />
      {/* SEO: 페이지당 H1 하나 필요. 기존 레이아웃을 해치지 않도록 sr-only로 숨김 */}
      <Typography variant="h1" className="sr-only">gonnux.com - Apps, Projects &amp; Blog</Typography>
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
