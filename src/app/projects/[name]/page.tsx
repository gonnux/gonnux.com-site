import { Metadata } from 'next'
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

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { name } = await params
  const project = config.projects.find((p) => p.name === name)

  if (!project) return { title: 'Project not found' }

  const url = `https://gonnux.com/projects/${name}`

  return {
    title: project.name,
    description: `${project.name} project by gonnux`,
    openGraph: {
      type: 'website',
      title: project.name,
      url,
      images: project.image ? [{ url: project.image }] : undefined,
    },
    alternates: { canonical: url },
  }
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
