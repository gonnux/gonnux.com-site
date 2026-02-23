import type { GetStaticPaths, GetStaticProps } from 'next'
import Typography from '@mui/material/Typography'
import ArticleList from '@/components/ArticleList'
import Pagination from '@/components/Pagination'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'
import type { Article } from '@/blog'
import type { Site } from '@/config'
import type { NextLayoutPage } from '@/types/layout'

type Props = {
  site: Site
  articles: Article[]
  currentPage: number
  totalPages: number
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllArticles, ARTICLES_PER_PAGE } = await import('@/blog')
  const allArticles = await getAllArticles()
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE)

  // 2페이지부터 생성 (1페이지는 /blog가 담당)
  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { page: String(i + 2) },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { getAllArticles, paginateArticles } = await import('@/blog')
  const { default: config } = await import('@/config')

  const page = Number(params?.page)

  // page=1은 /blog로 리다이렉트 (canonical 중복 방지)
  if (page === 1) {
    return { redirect: { destination: '/blog', permanent: true } }
  }

  const allArticles = await getAllArticles()
  const { articles, totalPages, currentPage } = paginateArticles(allArticles, page)

  // 범위 밖 페이지는 404
  if (page < 1 || page > totalPages || articles.length === 0) {
    return { notFound: true }
  }

  return {
    props: { site: config.site, articles, currentPage, totalPages },
    revalidate: 3600,
  }
}

const BlogPaginatedPage: NextLayoutPage<Props> = ({ site, articles, currentPage, totalPages }) => {
  // prev/next 링크 생성
  const prev = currentPage === 2 ? '/blog' : `/blog/page/${currentPage - 1}`
  const next = currentPage < totalPages ? `/blog/page/${currentPage + 1}` : undefined

  return (
    <>
      <SEO
        site={site}
        title={`Blog - Page ${currentPage}`}
        description="gonnux의 기술 블로그 - 개발, 프로그래밍 관련 글"
        canonical={`/blog/page/${currentPage}`}
        pagination={{ prev, next }}
      />
      <Typography variant="h4" component="h1" gutterBottom>Blog</Typography>
      <ArticleList articles={articles} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  )
}

BlogPaginatedPage.getLayout = (page) => <Layout>{page}</Layout>

export default BlogPaginatedPage
