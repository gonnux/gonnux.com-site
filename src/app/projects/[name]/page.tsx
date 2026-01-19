import config from '../../../config'
import axios from 'axios'
import marked from '../../../marked'
import ProjectContent from '../../../components/ProjectContent'

export async function generateStaticParams() {
  const { projects } = config
  return projects.map((project) => ({
    name: project.name,
  }))
}

interface ProjectPageProps {
  params: Promise<{ name: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { name } = await params
  const { projects } = config
  const project = projects.find((p) => p.name === name)

  if (!project) {
    return <div>Project not found</div>
  }

  const res = await axios.get(project.readme)
  const markdown = marked.parse(res.data) as string

  return <ProjectContent gitUrl={project.git} markdown={markdown} />
}
