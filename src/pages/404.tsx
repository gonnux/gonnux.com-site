import Typography from '@mui/material/Typography'
import { NextPage } from 'next'
import withLayout from '../components/withLayout'

const NotFoundPage: NextPage = () => {
  return (
    <Typography align="center" variant="h4">
      404 Not Found
    </Typography>
  )
}

export default withLayout(NotFoundPage)
