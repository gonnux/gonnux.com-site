import parse from 'html-react-parser'
import Divider from '@mui/material/Divider'
import GitHubIcon from '@mui/icons-material/GitHub'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import withLayout from '../../components/withLayout'
import { Project } from '../../config'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {

  const { default: config } = await import('../../config')
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

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { default: config } = await import('../../config')
  const { projects } = config
  const { default: axios } = await import('axios')
  const { marked } = await import('marked')

  const project = projects.find((project) => project.name === params!.name)

  const res = await axios.get(project!.readme)
  const markdown = marked(res.data) as string

  return {
    props: { project, markdown },
  }
}

const Project: NextPage<{ project: Project, markdown: string }> = (props) => {
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
