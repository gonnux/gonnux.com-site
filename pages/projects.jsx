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

const emptyImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

function Apps(props) {
  return (
    <Grid container spacing={2}>
    {
      props
      .projects
      .map((project) => (
        <Link key={project.name} href={project.site ?? project.git}>
          <Grid item xs={3}>
            <AppCard name={project.name} image={project.image ?? emptyImage} />
          </Grid>
        </Link>
      ))
    }
    </Grid>
  )
}

export default withLayout(Apps)
