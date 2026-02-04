import Layout from '@/components/Layout'
import ProjectList from '@/components/ProjectList'
import SEO from '@/components/SEO'
import { Project, Site } from '@/config'
import { GetStaticProps } from 'next'
import { NextLayoutPage } from '@/types/layout'

export const getStaticProps: GetStaticProps = async() => {

  const { default: config } = await import('@/config')
  const { site, projects } = config

  return {
    props: { site, projects },
  }
}

const ProjectsPage: NextLayoutPage<{ site: Site, projects: Project[] }> = (props) => {
  return (
    <>
      <SEO
        site={props.site}
        title="Projects"
        description="gonnux의 오픈소스 프로젝트 목록"
        canonical="/projects"
      />
      <ProjectList projects={props.projects} />
    </>
  )
}

ProjectsPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default ProjectsPage
