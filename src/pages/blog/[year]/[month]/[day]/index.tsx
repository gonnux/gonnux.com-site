import withLayout from '../../../../../components/withLayout'
import DateList from '../../../../../components/DateList'
import { YearMonthDay } from '../../../../../blog'
import blog from '../../../../../blog'
import { GetStaticPaths, NextPage } from 'next'

export const getStaticPaths: GetStaticPaths = async() => {
  const yearMonthDays = await blog.getAllYearMonthDays()
  return {
    paths: yearMonthDays.map((yearMonthDay) => ({
      params: {
        year: yearMonthDay.year.toString() ,
        month: yearMonthDay.month.toString(), 
        day: yearMonthDay.day.toString() 
      }
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: YearMonthDay }) {
  const indices = await blog.getIndices(params)
  return {
    props: { indices },
  }
}

const DayPage: NextPage<{ indices: number[]}> = (props) => {
  return (<DateList dates={props.indices} />)
}

export default withLayout(DayPage)