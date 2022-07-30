import withLayout from '../components/withLayout'
import ProjectList from '../components/ProjectList'

export async function getStaticProps() {
  const config = require('../config')

  const { projects } = config

  return {
    props: { projects },
  }
}

function Projects(props) {
  return (<ProjectList projects={props.projects} />)
}

export default withLayout(Projects)
