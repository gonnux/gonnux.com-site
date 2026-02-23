import Typography from '@mui/material/Typography'
import ArticleList from '@/components/ArticleList'
import Pagination from '@/components/Pagination'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'
import type { Article } from '@/blog'
import type { Site } from '@/config'
import type { GetStaticProps } from 'next'
import type { NextLayoutPage } from '@/types/layout'

type Props = {
  site: Site
  articles: Article[]
  totalPages: number
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { getAllArticles, paginateArticles } = await import('@/blog')
  const { default: config } = await import('@/config')

  const allArticles = await getAllArticles()
  const { articles, totalPages } = paginateArticles(allArticles, 1)

  return {
    props: { site: config.site, articles, totalPages },
    revalidate: 3600,
  }
}

const BlogPage: NextLayoutPage<Props> = ({ site, articles, totalPages }) => {
  return (
    <>
      <SEO
        site={site}
        title="Blog"
        description="gonnux의 기술 블로그 - 개발, 프로그래밍 관련 글"
        canonical="/blog"
        pagination={totalPages > 1 ? { next: '/blog/page/2' } : undefined}
      />
      <Typography variant="h4" component="h1" gutterBottom>Blog</Typography>
      <ArticleList articles={articles} />
      <Pagination currentPage={1} totalPages={totalPages} />
    </>
  )
}

BlogPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default BlogPage
