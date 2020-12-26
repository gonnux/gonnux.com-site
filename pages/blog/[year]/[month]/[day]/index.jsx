import withLayout from '../../../../../components/withLayout'
import DateList from '../../../../../components/DateList'

export async function getStaticPaths() {
  const blog = require('../../../../../blog')
  const days = await blog.getAllDays()
  return {
    paths: days.map((day) => ({
      params: day,
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const blog = require('../../../../../blog')
  const indices = await blog.getIndices({ year: params.year, month: params.month, day: params.day })
  return {
    props: { indices },
  }
}

function Day(props) {
  return (<DateList dates={props.indices} />)
}

export default withLayout(Day)
