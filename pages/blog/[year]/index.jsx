import withLayout from '../../../components/withLayout'
import DateList from '../../../components/DateList'

export async function getStaticPaths() {
  const blog = require('../../../blog')
  const years = await blog.getAllYears()

  return {
    paths: years.map((year) => ({
      params: {
        year,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const blog = require('../../../blog')
  const months = await blog.getMonths({ year: params.year })
  return {
    props: { months },
  }
}

function Year(props) {
  return (<DateList dates={props.months} />)
}

export default withLayout(Year)
