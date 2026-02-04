import parse from 'html-react-parser'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextLayoutPage } from '@/types/layout'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'
import { Article, YearMonthDayIndex } from '@/blog'
import { Site } from '@/config'
import { getArticleUrl } from '@/utils/url'
import { formatDate } from '@/utils/date'
import { DiscussionEmbed } from "disqus-react"


/*
interface Params extends ParsedUrlQuery {
  year: string,
  month: string,
  day: string,
  index: string
}
*/

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

  // 게시글 발행일 생성 (ISO 8601 형식)
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
      <Typography variant="h4">
        { props.article.title }
      </Typography>
      <Breadcrumbs>
        <Link color="inherit" href={`/blog/${props.article.year}`}>
          { props.article.year }
        </Link>
        <Link color="inherit" href={`/blog/${props.article.year}/${props.article.month}`}>
          { props.article.month }
        </Link>
        <Link color="inherit" href={`/blog/${props.article.year}/${props.article.month}/${props.article.day}`}>
          { props.article.day }
        </Link>
        <Link
          color="inherit"
          href={`/blog/${props.article.year}/${props.article.month}/${props.article.day}/${props.article.index}`}
        >
          { props.article.index }
        </Link>
      </Breadcrumbs>
      <Divider />
      <Box component="article">
        { parse(props.article.content) }
      </Box>
      <Divider />
      {disqusShortName && (
        <DiscussionEmbed
          shortname={ disqusShortName }
          config={ disqusConfig }
        />
      )}
    </>
  )
}

ArticlePage.getLayout = (page) => (<Layout>{page}</Layout>)

export default ArticlePage
