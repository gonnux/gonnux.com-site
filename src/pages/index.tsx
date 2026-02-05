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

  const { default: blog } = await import('@/blog')
  const { load } = await import('cheerio')
  const { default: config } = await import('@/config')

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

  const { site, apps, projects } = config

  return {
    props: { site, articles, apps, projects },
    revalidate: 3600, // ISR: regenerate every hour
  }
}

const IndexPage: NextLayoutPage<{ site: Site, articles: Article[], apps: App[], projects: Project[]}> = (props) => {
  return (
    <>
      <SEO site={props.site} canonical="/" />
      <section className="mb-6">
        <header className="mb-2">
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">Apps</h2>
        </header>
        <AppList apps={props.apps} />
      </section>
      <hr className="border-gray-200 dark:border-gray-700 my-6" />
      <section className="mb-6">
        <header className="mb-2">
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">Projects</h2>
        </header>
        <ProjectList projects={props.projects} />
      </section>
      <hr className="border-gray-200 dark:border-gray-700 my-6" />
      <section>
        <header className="mb-2">
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">Articles</h2>
        </header>
        <ArticleList articles={props.articles} />
      </section>
    </>
  )
}

IndexPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default IndexPage
