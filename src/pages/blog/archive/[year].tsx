import type { GetStaticPaths, GetStaticProps } from 'next'
import Typography from '@mui/material/Typography'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'
import ArticleList from '@/components/ArticleList'
import type { Article } from '@/blog'
import type { Site } from '@/config'
import type { NextLayoutPage } from '@/types/layout'

type Props = {
  site: Site
  year: string
  articles: Article[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllArticles } = await import('@/blog')
  const articles = await getAllArticles()
  // created에서 연도 추출하여 고유 연도 목록 생성
  const years = [...new Set(articles.map((a) => a.created.slice(0, 4)))]
  return {
    paths: years.map((year) => ({ params: { year } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { getAllArticles } = await import('@/blog')
  const { default: config } = await import('@/config')
  const year = params?.year as string
  const allArticles = await getAllArticles()
  const articles = allArticles.filter((a) => a.created.startsWith(year))

  if (articles.length === 0) {
    return { notFound: true }
  }

  return {
    props: { site: config.site, year, articles },
    revalidate: 3600,
  }
}

const YearArchivePage: NextLayoutPage<Props> = ({ site, year, articles }) => {
  return (
    <>
      <SEO site={site} title={`${year}년 글 목록`} description={`${year}년에 작성된 블로그 포스트`} />
      <Typography variant="h4" component="h1" gutterBottom>{year}년 글 목록</Typography>
      <ArticleList articles={articles} />
    </>
  )
}

YearArchivePage.getLayout = (page) => <Layout>{page}</Layout>

export default YearArchivePage
