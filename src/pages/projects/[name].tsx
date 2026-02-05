import parse from 'html-react-parser'
import Divider from '@mui/material/Divider'
import GitHubIcon from '@mui/icons-material/GitHub'
import IconButton from '@mui/material/IconButton'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'
import type { Project, Site } from '@/config'
import type { GetStaticPaths, GetStaticProps } from 'next'
import type { NextLayoutPage } from '@/types/layout'

export const getStaticPaths: GetStaticPaths = async () => {

  const { default: config } = await import('@/config')
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

  const { default: config } = await import('@/config')
  const { site, projects } = config
  const { default: axios } = await import('axios')
  const { default: marked } = await import('@/marked')

  const project = projects.find((project) => project.name === params!.name)

  try {
    const res = await axios.get(project!.readme)
    const markdown = await marked.parse(res.data)

    return {
      props: { site, project, markdown },
    }
  } catch (error) {
    console.error(`Failed to fetch readme for project ${project!.name}:`, error)
    return {
      props: { site, project, markdown: '<p>README를 불러오는데 실패했습니다.</p>' },
    }
  }
}

const ProjectPage: NextLayoutPage<{ site: Site, project: Project, markdown: string }> = (props) => {
  return (
    <>
      <SEO
        site={props.site}
        title={props.project.name}
        description={`${props.project.name} 프로젝트 - gonnux의 오픈소스 프로젝트`}
        canonical={`/projects/${props.project.name}`}
        ogImage={props.project.image}
      />
      <IconButton component="a" href={props.project.git} target="_blank" rel="noopener noreferrer" color="inherit">
        <GitHubIcon />
      </IconButton>
      <Divider />
      { parse(props.markdown) }
    </>
  )
}

ProjectPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default ProjectPage
