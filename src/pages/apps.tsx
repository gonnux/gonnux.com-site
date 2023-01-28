import { GetStaticProps, NextPage } from 'next'
import AppList from '../components/AppList'
import withLayout from '../components/withLayout'
import { App } from '../config'

export const getStaticProps: GetStaticProps<{apps: App[]}> = async() => {
  const { default: config } = await import('../config')
  const { apps } = config
  return {
    props: { apps },
  }
}

const Apps: NextPage<{ apps: App[] }> = (props) => {
  return (<AppList apps={props.apps} />)
}

export default withLayout(Apps)
