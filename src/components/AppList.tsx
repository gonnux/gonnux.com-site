import Grid from '@mui/material/Grid'
import Link from 'next/link'
import { FC } from 'react'
import { App } from '../config'
import { EMPTY_IMAGE } from '../constants'
import AppCard from './AppCard'

const AppList: FC<{ apps: App[] }> = (props) => {
  return (
    <Grid container spacing={2}>
      {
      props
        .apps
        .map((app) => (
          <Link key={app.name} href={app.site ?? app.git}>
            <Grid item xs={3} md={2}>
              <AppCard name={app.name} image={app.image ?? EMPTY_IMAGE} />
            </Grid>
          </Link>
        ))
    }
    </Grid>
  )
}

export default AppList
