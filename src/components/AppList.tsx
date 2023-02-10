import Grid from '@mui/material/Grid'
import Link from 'next/link'
import { FC } from 'react'
import { App } from '../config'
import { EMPTY_IMAGE } from '../constants'
import AppCard from './AppCard'

const AppList: FC<{ apps: App[] }> = (props) => {
  return (
    <Grid component="section" container spacing={2}>
      {
      props
        .apps
        .map((app) => {
          const appUrl = app.site ?? app.git
          return (
            <Link key={app.name} href={appUrl}>
              <Grid item xs={3} md={2}>
                <a href={appUrl}>
                  <AppCard name={app.name} image={app.image ?? EMPTY_IMAGE} />
                </a>
              </Grid>
            </Link>
          )
        })
      }
    </Grid>
  )
}

export default AppList
