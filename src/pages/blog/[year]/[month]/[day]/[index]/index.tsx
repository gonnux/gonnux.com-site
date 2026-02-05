import parse from 'html-react-parser'
import Link from 'next/link'
import type { GetStaticPaths, GetStaticProps } from 'next'
import type { NextLayoutPage } from '@/types/layout'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'
import type { Article, YearMonthDayIndex } from '@/blog'
import type { Site } from '@/config'
import { getArticleUrl } from '@/utils/url'
import { formatDate } from '@/utils/date'
import { DiscussionEmbed } from "disqus-react"

export const getStaticPaths: GetStaticPaths = async () => {

  const { default: blog } = await import('@/blog')

  const yearMonthDayIndices: YearMonthDayIndex[] = await blog.getAllYearMonthDayIndices()

  return {
    paths: yearMonthDayIndices.map((yearMonthDayIndex) => ({
      params: {
        year: yearMonthDayIndex.year.toString(),
        month: yearMonthDayIndex.month.toString(),
        day: yearMonthDayIndex.day.toString(),
        index: yearMonthDayIndex.index.toString()
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { default: blog } = await import('@/blog')
  const { default: config } = await import('@/config')

  const yearMonthDayIndex: YearMonthDayIndex = {
    year: parseInt(params!.year as string),
    month: parseInt(params!.month as string),
    day: parseInt(params!.day as string),
    index: parseInt(params!.index as string)
  }

  return {
    props: { site: config.site, article: await blog.getArticle(yearMonthDayIndex) },
    revalidate: 86400, // ISR: regenerate daily (blog posts rarely change)
  }
}

const ArticlePage: NextLayoutPage<{ site: Site, article: Article }> = (props) => {
  const disqusShortName = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME
  const articleUrl = getArticleUrl(props.article)
  const disqusConfig = {
    url: `${props.site.url}${articleUrl}`,
    identifier: articleUrl,
    title: props.article.title
  }

  // Generate article publish date in ISO 8601 format
  const publishedTime = formatDate(props.article.year, props.article.month, props.article.day)

  return (
    <>
      <SEO
        site={props.site}
        title={props.article.title}
        description={props.article.excerpt}
        canonical={articleUrl}
        ogType="article"
        article={{
          publishedTime,
        }}
      />
      <h1 className="text-2xl font-normal text-gray-900 dark:text-gray-100 mb-2">
        {props.article.title}
      </h1>
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <Link href={`/blog/${props.article.year}`} className="hover:underline">
              {props.article.year}
            </Link>
          </li>
          <li className="text-gray-400">&gt;</li>
          <li>
            <Link href={`/blog/${props.article.year}/${props.article.month}`} className="hover:underline">
              {props.article.month}
            </Link>
          </li>
          <li className="text-gray-400">&gt;</li>
          <li>
            <Link href={`/blog/${props.article.year}/${props.article.month}/${props.article.day}`} className="hover:underline">
              {props.article.day}
            </Link>
          </li>
          <li className="text-gray-400">&gt;</li>
          <li>
            <Link
              href={`/blog/${props.article.year}/${props.article.month}/${props.article.day}/${props.article.index}`}
              className="hover:underline"
            >
              {props.article.index}
            </Link>
          </li>
        </ol>
      </nav>
      <hr className="border-gray-200 dark:border-gray-700 my-4" />
      <article className="prose dark:prose-invert max-w-none">
        {parse(props.article.content)}
      </article>
      <hr className="border-gray-200 dark:border-gray-700 my-4" />
      {disqusShortName && (
        <DiscussionEmbed
          shortname={disqusShortName}
          config={disqusConfig}
        />
      )}
    </>
  )
}

ArticlePage.getLayout = (page) => (<Layout>{page}</Layout>)

export default ArticlePage
