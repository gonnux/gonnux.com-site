'use client'

import { ReactNode } from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import AppBar from './AppBar'
import Footer from './Footer'

const PREFIX = 'Layout'

const classes = {
  container: `${PREFIX}-container`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.container}`]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    overflowX: 'auto',
  },
}))

export default function LayoutContent({ children }: { children: ReactNode }) {
  return (
    <Root>
      <AppBar />
      <Divider />
      <Container component="main" className={classes.container} maxWidth="md">
        {children}
      </Container>
      <Divider />
      <Footer />
    </Root>
  )
}
