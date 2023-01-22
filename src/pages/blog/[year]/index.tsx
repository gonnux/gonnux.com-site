import withLayout from '../../../components/withLayout'
import DateList from '../../../components/DateList'
import blog from '../../../blog'
import { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const years = await blog.getAllYears()

  return {
    paths: years.map((year) => ({
      params: {
        year: year.toString(),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const months = await blog.getMonths({ year: parseInt(params!.year as string) })
  return {
    props: { months },
  }
}

function Year(props: { months: number[] } ) {
  return (<DateList dates={props.months} />)
}

export default withLayout(Year)
