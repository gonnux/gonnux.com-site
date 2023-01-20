import { GetStaticProps, NextPage } from 'next'
import AppList from '../components/AppList'
import withLayout from '../components/withLayout'
import config, { App } from '../config'


export const getStaticProps: GetStaticProps<{apps: App[]}> = () => {
  const { apps } = config
  return {
    props: { apps },
  }
}

const Apps: NextPage<{ apps: App[] }> = (props) => {
  return (<AppList apps={props.apps} />)
}

export default withLayout(Apps)
