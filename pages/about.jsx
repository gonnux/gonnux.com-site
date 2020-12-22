import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Link from 'next/link'
import AppCard from '../components/AppCard'
import withLayout from '../components/withLayout'
import parse from 'html-react-parser';

export async function getStaticProps(context) {
  const axios = require('axios')
  const marked = require('marked')
  const res = await axios.get('https://raw.githubusercontent.com/binkoni/binkoni/main/README.md')
  const about = marked(res.data)

  return {
    props: { about },
  }
}

function About(props) {
  return parse(props.about)
}

export default withLayout(About)
