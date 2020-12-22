import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Link from 'next/link'
import AppCard from '../components/AppCard'
import withLayout from '../components/withLayout'

export async function getStaticProps(context) {
  const yaml = require('js-yaml')
  const fs = require('fs')

  const { apps } = yaml.safeLoad(fs.readFileSync('data.yaml', 'utf8'))

  return {
    props: { apps },
  }
}

const emptyImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

function Apps(props) {
  return (
    <Grid container spacing={2}>
    {
      props
      .apps
      .map((app, idx) => (
        <Link key={idx} href={app.site ?? app.git}>
          <Grid item xs={3}>
            <AppCard name={app.name} image={app.image ?? emptyImage} />
          </Grid>
        </Link>
      ))
    }
    </Grid>
  )
}

export default withLayout(Apps)
