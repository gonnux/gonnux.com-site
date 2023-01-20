import parse from 'html-react-parser'
import withLayout from '../components/withLayout'
import config from '../config'
import axios from 'axios'
import { marked } from 'marked'
import { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps<{ about: string}> = async () => {
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
