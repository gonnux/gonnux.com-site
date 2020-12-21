import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Link from 'next/link'
import AppCard from '../components/AppCard'
import withLayout from '../components/withLayout'

export async function getStaticProps(context) {
  const yaml = require('js-yaml')
  const fs = require('fs')

  const { projects } = yaml.safeLoad(fs.readFileSync('data.yaml', 'utf8'))

  return {
    props: { projects },
  }
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}))

const emptyImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

function Apps(props) {
  const classes = useStyles()
  return (
    <>
      <Container className={classes.container} maxWidth="sm">
        <Grid container spacing={2} className={classes.gridContainer}>
          {
        props.projects
          .map((project, idx) => (
            <Link key={idx} href={project.site ?? project.git}>
              <Grid item xs={3}>
                <AppCard name={project.name} image={project.image ?? emptyImage} />
              </Grid>
            </Link>
          ))
      }
        </Grid>
      </Container>
    </>
  )
}

export default withLayout(Apps)
