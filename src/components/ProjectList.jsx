import Grid from '@material-ui/core/Grid'
import Link from 'next/link'
import { EMPTY_IMAGE } from '../constants'
import AppCard from './AppCard'

function ProjectList(props) {
  return (
    <Grid container spacing={2}>
      {
      props
        .projects
        .map((project) => (
          <Link key={project.name} href={`/projects/${project.name}`}>
            <Grid item xs={3}>
              <AppCard name={project.name} image={project.image ?? EMPTY_IMAGE} />
            </Grid>
          </Link>
        ))
    }
    </Grid>
  )
}

export default ProjectList
