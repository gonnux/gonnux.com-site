import parse from 'html-react-parser'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import withLayout from '../../../../../../components/withLayout'
import { NextPage } from 'next'
import { Article } from '../../../../../../blog'
import { YearMonthDayIndex } from '../../../../../../blog'

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

const ArticlePage: NextPage<{ article: Article }> = (props) => {
  return (
    <>
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
        <Link color="inherit" href={`/blog/${props.article.year}/${props.article.month}/${props.article.day}/${props.article.index}`}>{ props.article.index }</Link>
      </Breadcrumbs>
      <Divider />
      { parse(props.article.content) }
    </>
  )
}

export default withLayout(ArticlePage)
