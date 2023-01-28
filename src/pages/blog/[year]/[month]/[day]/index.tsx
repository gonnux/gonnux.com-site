import Layout from '../../../../../components/Layout'
import DateList from '../../../../../components/DateList'
import { YearMonthDay } from '../../../../../blog'
import { GetStaticPaths, NextLayoutPage } from 'next'

export const getStaticPaths: GetStaticPaths = async() => {

  const { default: blog } = await import('../../../../../blog')

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

  const { default: blog } = await import('../../../../../blog')

  const indices = await blog.getIndices(params)

  return {
    props: { indices },
  }
}

const DayPage: NextLayoutPage<{ indices: number[]}> = (props) => {
  return (<DateList dates={props.indices} />)
}

DayPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default DayPage
