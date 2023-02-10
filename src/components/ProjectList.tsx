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
            <Link key={project.name} href={projectUrl}>
              <Grid item xs={3} md={2}>
                <a href={projectUrl}>
                  <AppCard name={project.name} image={project.image ?? EMPTY_IMAGE} />
                </a>
              </Grid>
            </Link>
          )
        })
      }
    </Grid>
  )
}

export default ProjectList
