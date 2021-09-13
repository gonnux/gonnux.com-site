import Grid from '@material-ui/core/Grid'
import Link from 'next/link'
import { EMPTY_IMAGE } from '../constants'
import AppCard from './AppCard'

function AppList(props) {
  return (
    <Grid container spacing={2}>
      {
      props
        .apps
        .map((app) => (
          <Link key={app.name} href={app.site ?? app.git}>
            <Grid item xs={3}>
              <AppCard name={app.name} image={app.image ?? EMPTY_IMAGE} />
            </Grid>
          </Link>
        ))
    }
    </Grid>
  )
}

export default AppList
