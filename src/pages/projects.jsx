import withLayout from '../components/withLayout'
import ProjectList from '../components/ProjectList'
import { DATA_YAML } from '../constants'

export async function getStaticProps() {
  const yaml = require('js-yaml')
  const fs = require('fs')

  const { projects } = yaml.safeLoad(fs.readFileSync(DATA_YAML, 'utf8'))

  return {
    props: { projects },
  }
}

function Projects(props) {
  return (<ProjectList projects={props.projects} />)
}

export default withLayout(Projects)
