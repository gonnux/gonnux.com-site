import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import HomeIcon from '@mui/icons-material/Home'
import MessageIcon from '@mui/icons-material/Message'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { NextLayoutPage } from '@/types/layout'
import Layout from '@/components/Layout'

const NotFoundPage: NextLayoutPage = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
        Page not found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        The page you are looking for does not exist.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          component={Link}
          href="/"
          variant="contained"
          startIcon={<HomeIcon />}
        >
          Home
        </Button>
        <Button
          component={Link}
          href="/blog"
          variant="outlined"
          startIcon={<MessageIcon />}
        >
          Blog
        </Button>
      </Box>
    </Box>
  )
}

NotFoundPage.getLayout = (page: ReactNode) => (<Layout>{page}</Layout>)

export default NotFoundPage
