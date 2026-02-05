import ArticleList from '@/components/ArticleList'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'
import type { Article } from '@/blog'
import type { Site } from '@/config'
import type { GetStaticProps } from 'next'
import type { NextLayoutPage } from '@/types/layout'

export const getStaticProps: GetStaticProps = async () => {

  const { default: blog } = await import('@/blog')
  const { default: config } = await import('@/config')
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
    props: { site: config.site, articles },
    revalidate: 3600, // ISR: regenerate every hour
  }
}

const BlogPage: NextLayoutPage<{ site: Site, articles: [Article]}> = (props) => {
  return (
    <>
      <SEO
        site={props.site}
        title="Blog"
        description="gonnux의 기술 블로그 - 개발, 프로그래밍 관련 글"
        canonical="/blog"
      />
      <ArticleList articles={props.articles} />
    </>
  )
}

BlogPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default BlogPage
