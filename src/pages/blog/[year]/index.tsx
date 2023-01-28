import Layout from '../../../components/Layout'
import DateList from '../../../components/DateList'
import { GetStaticPaths, GetStaticProps, NextLayoutPage } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {

  const { default: blog } = await import('../../../blog')
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
  const { default: blog } = await import('../../../blog')
  const months = await blog.getMonths({ year: parseInt(params!.year as string) })
  return {
    props: { months },
  }
}

const YearPage: NextLayoutPage<{ months: number[]}> = (props) => {
  return (<DateList dates={props.months} />)
}

YearPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default YearPage
