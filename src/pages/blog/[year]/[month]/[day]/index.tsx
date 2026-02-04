import Layout from '../../../../../components/Layout'
import DateList from '../../../../../components/DateList'
import SEO from '../../../../../components/SEO'
import { YearMonthDay } from '../../../../../blog'
import { Site } from '../../../../../config'
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
  const { default: config } = await import('../../../../../config')

  const { year, month, day } = params
  const indices = await blog.getIndices(params)

  return {
    props: { site: config.site, year, month, day, indices },
  }
}

interface DayPageProps {
  site: Site
  year: number
  month: number
  day: number
  indices: number[]
}

const DayPage: NextLayoutPage<DayPageProps> = (props) => {
  return (
    <>
      <SEO
        site={props.site}
        title={`Blog ${props.year}/${props.month}/${props.day}`}
        description={`${props.year}년 ${props.month}월 ${props.day}일 블로그 글 목록`}
        canonical={`/blog/${props.year}/${props.month}/${props.day}`}
      />
      <DateList dates={props.indices} />
    </>
  )
}

DayPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default DayPage
