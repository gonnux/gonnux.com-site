import Grid from '@mui/material/Grid'
import Link from 'next/link'
import { FC } from 'react'
import { Project } from '../config'
import { EMPTY_IMAGE } from '../constants'
import AppCard from './AppCard'

const ProjectList: FC<{ projects: Project[] }> = (props) => {
  return (
    <Grid container spacing={2}>
      {
        props
        .projects
        .map((project) => {
          const projectUrl = `/projects/${project.name}`
          return (
            <Grid key={project.name} item xs={3} md={2}>
              <Link href={projectUrl}>
                <AppCard name={project.name} image={project.image ?? EMPTY_IMAGE} />
              </Link>
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default ProjectList
