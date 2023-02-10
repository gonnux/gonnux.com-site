import parse from 'html-react-parser'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Layout from '../../../../../../components/Layout'
import { NextLayoutPage } from 'next'
import { Article } from '../../../../../../blog'
import { YearMonthDayIndex } from '../../../../../../blog'
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

  const { default: blog } = await import('../../../../../../blog')

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

  const { default: blog } = await import('../../../../../../blog')

  const yearMonthDayIndex: YearMonthDayIndex = {
    year: parseInt(params!.year as string),
    month: parseInt(params!.month as string),
    day: parseInt(params!.day as string),
    index: parseInt(params!.index as string)
  }

  return {
    props: { article: await blog.getArticle(yearMonthDayIndex) },
  }
}

const ArticlePage: NextLayoutPage<{ article: Article }> = (props) => {
  const disqusShortName = 'gonnux'
  const disqusConfig = {
    url: `https://gonnux.com/blog/${props.article.year}/${props.article.month}/${props.article.day}/${props.article.index}`,
    identifier: `${props.article.year}/${props.article.month}/${props.article.day}/${props.article.index}`,
    title: props.article.title
  }

  return (
    <>
      <Typography variant="h4">
        { props.article.title }
      </Typography>
      <Breadcrumbs>
        <Link color="inherit" href={`/blog/${props.article.year}`}>
          <a>{ props.article.year }</a>
        </Link>
        <Link color="inherit" href={`/blog/${props.article.year}/${props.article.month}`}>
          <a>{ props.article.month }</a>
        </Link>
        <Link color="inherit" href={`/blog/${props.article.year}/${props.article.month}/${props.article.day}`}>
          <a>{ props.article.day }</a>
        </Link>
        <Link
          color="inherit"
          href={`/blog/${props.article.year}/${props.article.month}/${props.article.day}/${props.article.index}`}
        >
          <a>{ props.article.index }</a>
        </Link>
      </Breadcrumbs>
      <Divider />
      <Box component="article">
        { parse(props.article.content) }
      </Box>
      <Divider />
      <DiscussionEmbed
        shortname={ disqusShortName }
        config={ disqusConfig }
      />
    </>
  )
}

ArticlePage.getLayout = (page) => (<Layout>{page}</Layout>)

export default ArticlePage
