import { GetStaticProps, NextLayoutPage } from 'next'
import AppList from '../components/AppList'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { App, Site } from '../config'

export const getStaticProps: GetStaticProps<{site: Site, apps: App[]}> = async() => {
  const { default: config } = await import('../config')
  const { site, apps } = config
  return {
    props: { site, apps },
  }
}

const AppsPage: NextLayoutPage<{ site: Site, apps: App[] }> = (props) => {
  return (
    <>
      <SEO
        site={props.site}
        title="Apps"
        description="gonnux가 만든 앱 목록 - 웹 앱과 오픈소스 프로젝트"
        canonical="/apps"
      />
      <AppList apps={props.apps} />
    </>
  )
}

AppsPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default AppsPage
