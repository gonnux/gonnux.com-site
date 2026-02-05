import Layout from '@/components/Layout'
import DateList from '@/components/DateList'
import SEO from '@/components/SEO'
import type { Site } from '@/config'
import type { GetStaticPaths, GetStaticProps } from 'next'
import type { NextLayoutPage } from '@/types/layout'

export const getStaticPaths: GetStaticPaths = async () => {

  const { default: blog } = await import('@/blog')
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
  const { default: blog } = await import('@/blog')
  const { default: config } = await import('@/config')
  const year = parseInt(params!.year as string)
  const months = await blog.getMonths({ year })
  return {
    props: { site: config.site, year, months },
  }
}

const YearPage: NextLayoutPage<{ site: Site, year: number, months: number[] }> = (props) => {
  return (
    <>
      <SEO
        site={props.site}
        title={`Blog ${props.year}`}
        description={`${props.year}년 블로그 글 목록`}
        canonical={`/blog/${props.year}`}
      />
      <DateList dates={props.months} />
    </>
  )
}

YearPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default YearPage
