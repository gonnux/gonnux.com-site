import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'
import type { NextLayoutPage } from '@/types/layout'
import Layout from '@/components/Layout'

const NotFoundPage: NextLayoutPage = () => {
  return (
    <Typography align="center" variant="h4">
      404 Not Found
    </Typography>
  )
}

NotFoundPage.getLayout = (page: ReactNode) => (<Layout>{page}</Layout>)

export default NotFoundPage
