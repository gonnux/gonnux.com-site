import parse from 'html-react-parser'
import Divider from '@mui/material/Divider'
import GitHubIcon from '@mui/icons-material/GitHub'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { Project } from '../../config'
import { GetStaticPaths, GetStaticProps, NextLayoutPage } from 'next'

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
  const { default: marked } = await import('../../marked')

  const project = projects.find((project) => project.name === params!.name)

  const res = await axios.get(project!.readme)
  const markdown = marked.parse(res.data) as string

  return {
    props: { project, markdown },
  }
}

const ProjectPage: NextLayoutPage<{ project: Project, markdown: string }> = (props) => {
  return (
    <>
      <Link href={props.project.git}>
        <a>
          <IconButton color="inherit">
            <GitHubIcon />
          </IconButton>
        </a>
      </Link>
      <Divider />
      { parse(props.markdown) }
    </>
  )
}

ProjectPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default ProjectPage
