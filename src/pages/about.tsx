import parse from 'html-react-parser'
import Layout from '../components/Layout'
import { GetStaticProps, NextLayoutPage } from 'next'
import Box from '@mui/material/Box';

export const getStaticProps: GetStaticProps<{ about: string}> = async () => {
  const { default: config } = await import('../config')
  const { default: axios } = await import('axios')
  const { default: marked } = await import('../marked')

  const res = await axios.get(config.about.markdown)
  const about = marked.parse(res.data)
  return {
    props: { about },
  }
}

const AboutPage: NextLayoutPage<{ about: string }> = (props) => {
  return parse(props.about) as JSX.Element
}

AboutPage.getLayout = (page) => (
  <Layout>
    <Box component="article">
      {page}
    </Box>
  </Layout>
)

export default AboutPage
