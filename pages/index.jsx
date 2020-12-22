import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import AppList from '../components/AppList'
import ProjectList from '../components/ProjectList'
import withLayout from '../components/withLayout'

export async function getStaticProps() {
  const yaml = require('js-yaml')
  const fs = require('fs')

  const { apps, projects } = yaml.safeLoad(fs.readFileSync('data.yaml', 'utf8'))

  return {
    props: { apps, projects },
  }
}

const useStyles = makeStyles((theme) => ({
}))

function Index(props) {
  const classes = useStyles()
  return (
    <>
      <Typography variant="h5">Articles</Typography>
      <Divider />
      <Typography variant="h5">Apps</Typography>
      <AppList apps={props.apps} />
      <Divider />
      <Typography variant="h5">Projects</Typography>
      <ProjectList projects={props.projects} />
    </>
  )
}

export default withLayout(Index)
