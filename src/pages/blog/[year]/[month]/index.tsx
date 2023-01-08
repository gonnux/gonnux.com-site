import withLayout from '../../../../components/withLayout'
import DateList from '../../../../components/DateList'

export async function getStaticPaths() {
  const blog = require('../../../../blog')
  const months = await blog.getAllMonths()
  return {
    paths: months.map((month) => ({
      params: month,
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const blog = require('../../../../blog')
  const days = await blog.getDays({ year: params.year, month: params.month })
  return {
    props: { days },
  }
}

function Month(props) {
  return (<DateList dates={props.days} />)
}

export default withLayout(Month)
