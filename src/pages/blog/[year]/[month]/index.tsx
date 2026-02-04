import Layout from '@/components/Layout'
import DateList from '@/components/DateList'
import SEO from '@/components/SEO'
import { Site } from '@/config'
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextLayoutPage } from '@/types/layout'

export const getStaticPaths: GetStaticPaths = async () => {

  const { default: blog } = await import('@/blog')

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

  const { default: blog } = await import('@/blog')
  const { default: config } = await import('@/config')

  const year = parseInt(params!.year as string)
  const month = parseInt(params!.month as string)
  const days = await blog.getDays({ year, month })

  return {
    props: { site: config.site, year, month, days },
  }
}

const MonthPage: NextLayoutPage<{ site: Site, year: number, month: number, days: number[] }> = (props) => {
  return (
    <>
      <SEO
        site={props.site}
        title={`Blog ${props.year}/${props.month}`}
        description={`${props.year}년 ${props.month}월 블로그 글 목록`}
        canonical={`/blog/${props.year}/${props.month}`}
      />
      <DateList dates={props.days} />
    </>
  )
}

MonthPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default MonthPage
