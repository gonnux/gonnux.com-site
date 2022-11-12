import parse from 'html-react-parser'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import withLayout from '../../../../../../components/withLayout'

export const getStaticPaths: GetStaticPaths = async () => {
  const blog = require('../../../../../../blog')
  const indices: ParsedUrlQuery[] = await blog.getAllIndices()

  return {
    paths: indices.map((index) => ({
      params: index,
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const blog = require('../../../../../../blog')

  return {
    props: { article: await blog.getArticle(context.params) },
  }
}

function Article(props: any) {
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
