import Typography from '@mui/material/Typography'
import { NextLayoutPage } from 'next'
import Layout from '../components/Layout'

const NotFoundPage: NextLayoutPage = () => {
  return (
    <Typography align="center" variant="h4">
      404 Not Found
    </Typography>
  )
}

NotFoundPage.getLayout = (page) => (<Layout>{page}</Layout>)

export default NotFoundPage
