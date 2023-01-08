import parse from 'html-react-parser'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import withLayout from '../../../../../../components/withLayout'
import { NextPage } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const blog = require('../../../../../../blog')
  const indices: ParsedUrlQuery[] = await blog.getAllIndices()

  return {
    paths: indices.map((index: ParsedUrlQuery) => ({
      params: index,
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>) => {
  const blog = require('../../../../../../blog')

  return {
    props: { article: await blog.getArticle(context.params) },
  }
}

const Article: NextPage = (props: any) => {
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

export default withLayout(Article)
