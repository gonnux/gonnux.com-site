import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import { FC, ReactNode } from 'react'
import AppBar from './AppBar'
import Footer from './Footer'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <AppBar />
      <Divider />
      <Container
        component="main"
        maxWidth="md"
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
          overflowX: 'auto',
        }}
      >
        {children}
      </Container>
      <Divider />
      <Footer />
    </>
  )
}

export default Layout
