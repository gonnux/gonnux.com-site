import Layout from '../components/Layout'
import ProjectList from '../components/ProjectList'
import { Project } from '../config'
import { GetStaticProps, NextLayoutPage } from 'next'

export const getStaticProps: GetStaticProps = async() => {

  const { default: config } = await import('../config')
  const { projects } = config

  return {
    props: { projects },
  }
}

const ProjectsPage: NextLayoutPage<{ projects: Project[] }> = (props) => {
  return (<ProjectList projects={props.projects} />)
}

ProjectsPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default ProjectsPage
