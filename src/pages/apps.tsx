import AppList from '../components/AppList'
import withLayout from '../components/withLayout'

export async function getStaticProps() {
  const config = require('../config')

  const { apps } = config

  return {
    props: { apps },
  }
}

function Apps(props) {
  return (<AppList apps={props.apps} />)
}

export default withLayout(Apps)
