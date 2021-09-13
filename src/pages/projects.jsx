import withLayout from '../components/withLayout'
import ProjectList from '../components/ProjectList'

export async function getStaticProps() {
  const yaml = require('js-yaml')
  const fs = require('fs')

  const { projects } = yaml.safeLoad(fs.readFileSync('data.yaml', 'utf8'))

  return {
    props: { projects },
  }
}

function Projects(props) {
  return (<ProjectList projects={props.projects} />)
}

export default withLayout(Projects)
