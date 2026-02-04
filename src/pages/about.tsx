import parse from 'html-react-parser'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'
import { Site } from '@/config'
import { GetStaticProps } from 'next'
import { NextLayoutPage } from '@/types/layout'
import Box from '@mui/material/Box'

export const getStaticProps: GetStaticProps<{ site: Site, about: string}> = async () => {
  const { default: config } = await import('@/config')
  const { default: axios } = await import('axios')
  const { default: marked } = await import('@/marked')

  try {
    const res = await axios.get(config.about.markdown)
    const about = marked.parse(res.data)
    return {
      props: { site: config.site, about },
    }
  } catch (error) {
    console.error('Failed to fetch about markdown:', error)
    return {
      props: { site: config.site, about: '<p>콘텐츠를 불러오는데 실패했습니다.</p>' },
    }
  }
}

const AboutPage: NextLayoutPage<{ site: Site, about: string }> = (props) => {
  return (
    <>
      <SEO
        site={props.site}
        title="About"
        description="gonnux에 대해서 - 개발자 소개 및 프로필"
        canonical="/about"
      />
      {parse(props.about) as JSX.Element}
    </>
  )
}

AboutPage.getLayout = (page) => (
  <Layout>
    <Box component="article">
      {page}
    </Box>
  </Layout>
)

export default AboutPage
