import AppList from '../components/AppList'
import withLayout from '../components/withLayout'

export async function getStaticProps() {
  const yaml = require('js-yaml')
  const fs = require('fs')

  const { apps } = yaml.safeLoad(fs.readFileSync('data.yaml', 'utf8'))

  return {
    props: { apps },
  }
}

function Apps(props) {
  return (<AppList apps={props.apps} />)
}

export default withLayout(Apps)
