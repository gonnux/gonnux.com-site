import { GetStaticProps, NextLayoutPage } from 'next'
import AppList from '../components/AppList'
import Layout from '../components/Layout'
import { App } from '../config'

export const getStaticProps: GetStaticProps<{apps: App[]}> = async() => {
  const { default: config } = await import('../config')
  const { apps } = config
  return {
    props: { apps },
  }
}

const AppsPage: NextLayoutPage<{ apps: App[] }> = (props) => {
  return (<AppList apps={props.apps} />)
}

AppsPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default AppsPage
