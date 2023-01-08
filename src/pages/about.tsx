import parse from 'html-react-parser'
import withLayout from '../components/withLayout'

export async function getStaticProps() {
  const config = require('../config')
  const axios = require('axios')
  const { marked } = require('marked')
  const res = await axios.get(config.about.markdown)
  const about = marked(res.data)

  return {
    props: { about },
  }
}

function About(props) {
  return parse(props.about)
}

export default withLayout(About)
