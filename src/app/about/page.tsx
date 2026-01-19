import config from '../../config'
import axios from 'axios'
import marked from '../../marked'
import AboutContent from '../../components/AboutContent'

export default async function AboutPage() {
  const res = await axios.get(config.about.markdown)
  const about = marked.parse(res.data) as string

  return <AboutContent content={about} />
}
