import parse from 'html-react-parser'
import { Github } from 'lucide-react'
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
      revalidate: 3600, // ISR: regenerate every hour
    }
  } catch (error) {
    console.error(`Failed to fetch readme for project ${project!.name}:`, error)
    return {
      props: { site, project, markdown: '<p>Failed to load README.</p>' },
      revalidate: 60, // Retry sooner on error
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
      <a
        href={props.project.git}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="GitHub repository"
      >
        <Github className="h-5 w-5" />
      </a>
      <hr className="border-gray-200 dark:border-gray-700 my-4" />
      {parse(props.markdown)}
    </>
  )
}

ProjectPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default ProjectPage
