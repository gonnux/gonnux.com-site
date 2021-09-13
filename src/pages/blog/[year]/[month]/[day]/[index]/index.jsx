import parse from 'html-react-parser'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import withLayout from '../../../../../../components/withLayout'

export async function getStaticPaths() {
  const blog = require('../../../../../../blog')
  const indices = await blog.getAllIndices()

  return {
    paths: indices.map((index) => ({
      params: index,
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const blog = require('../../../../../../blog')
  return {
    props: { article: await blog.getArticle(params) },
  }
}

function Article(props) {
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
