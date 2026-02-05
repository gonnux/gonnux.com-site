import type { FC } from 'react'
import type { Project } from '@/config'
import GridCardList from './GridCardList'

const ProjectList: FC<{ projects: Project[] }> = ({ projects }) => (
  <GridCardList
    items={projects}
    getUrl={(project) => `/projects/${project.name}`}
    getName={(project) => project.name}
    getImage={(project) => project.image}
  />
)

export default ProjectList
