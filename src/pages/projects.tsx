import withLayout from '../components/withLayout'
import ProjectList from '../components/ProjectList'
import config from '../config'
import { Project } from '../config'
import { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps = () => {
  const { projects } = config
  return {
    props: { projects },
  }
}

const ProjectsPage: NextPage<{ projects: Project[] }> = (props) => {
  return (<ProjectList projects={props.projects} />)
}

export default withLayout(ProjectsPage)
