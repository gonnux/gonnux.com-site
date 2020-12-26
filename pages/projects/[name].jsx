import parse from 'html-react-parser'
import Divider from '@material-ui/core/Divider'
import GitHubIcon from '@material-ui/icons/GitHub'
import IconButton from '@material-ui/core/IconButton'
import Link from 'next/link'
import withLayout from '../../components/withLayout'

export async function getStaticPaths() {
  const yaml = require('js-yaml')
  const fs = require('fs')
  const { projects } = yaml.safeLoad(fs.readFileSync('data.yaml', 'utf8'))
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
  const yaml = require('js-yaml')
  const fs = require('fs')
  const { projects } = yaml.safeLoad(fs.readFileSync('data.yaml', 'utf8'))

  const project = projects.find((project) => project.name === params.name)

  const axios = require('axios')
  const marked = require('marked')
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
