import AppList from '../components/AppList'
import withLayout from '../components/withLayout'
import { DATA_YAML } from '../constants'

export async function getStaticProps() {
  const yaml = require('js-yaml')
  const fs = require('fs')

  const { apps } = yaml.safeLoad(fs.readFileSync(DATA_YAML, 'utf8'))

  return {
    props: { apps },
  }
}

function Apps(props) {
  return (<AppList apps={props.apps} />)
}

export default withLayout(Apps)
