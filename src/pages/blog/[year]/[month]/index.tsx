import withLayout from '../../../../components/withLayout'
import DateList from '../../../../components/DateList'
import blog from '../../../../blog'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'


export const getStaticPaths: GetStaticPaths = async () => {
  const yearMonths = await blog.getAllYearMonths()
  return {
    paths: yearMonths.map((yearMonth) => ({
      params: {
        year: yearMonth.year.toString(),
        month: yearMonth.month.toString()
      }
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const days = await blog.getDays({
    year: parseInt(params!.year as string),
    month: parseInt(params!.month as string)
  })
  return {
    props: { days },
  }
}

const MonthPage: NextPage<{ days: number[] }> = (props) => {
  return (<DateList dates={props.days} />)
}

export default withLayout(MonthPage)
