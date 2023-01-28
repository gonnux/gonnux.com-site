import parse from 'html-react-parser'
import withLayout from '../components/withLayout'
import { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps<{ about: string}> = async () => {
  const { default: config } = await import('../config')
  const { default: axios } = await import('axios')
  const { marked } = await import('marked')

  const res = await axios.get(config.about.markdown)
  const about = marked(res.data)
  return {
    props: { about },
  }
}

const AboutPage: NextPage<{ about: string }> = (props) => {
  return parse(props.about) as JSX.Element
}

export default withLayout(AboutPage)
