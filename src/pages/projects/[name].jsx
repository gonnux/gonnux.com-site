import parse from 'html-react-parser'
import Divider from '@mui/material/Divider'
import GitHubIcon from '@mui/icons-material/GitHub'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import withLayout from '../../components/withLayout'

export async function getStaticPaths() {
  const config = require('../../config')
  const { projects } = config
  return {
    paths: projects.map((project) => ({
      params: {
        name: project.name,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const config = require('../../config')

  const { projects } = config

  const project = projects.find((project) => project.name === params.name)

  const axios = require('axios')
  const { marked } = require('marked')
  const res = await axios.get(project.readme)
  const markdown = marked(res.data)

  return {
    props: { project, markdown },
  }
}

function Project(props) {
  return (
    <>
      <Link href={props.project.git}>
        <IconButton color="inherit">
          <GitHubIcon />
        </IconButton>
      </Link>
      <Divider />
      { parse(props.markdown) }
    </>
  )
}

export default withLayout(Project)
