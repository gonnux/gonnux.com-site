import ProjectList from '../../components/ProjectList'
import config from '../../config'

export const dynamic = 'force-static'

export default function ProjectsPage() {
  const { projects } = config
  return <ProjectList projects={projects} />
}
