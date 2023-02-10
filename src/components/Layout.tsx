import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import { FC, ReactNode } from 'react'
import AppBar from './AppBar'
import Footer from './Footer'

// https://dev.to/ofilipowicz/next-js-per-page-layouts-and-typescript-lh5
const PREFIX = 'Layout';

const classes = {
  container: `${PREFIX}-container`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.container}`]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    overflowX: 'auto',
  }
}));

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Root>
      <AppBar />
      <Divider />
      <Container component="main" className={classes.container} maxWidth="md">
        { children }
      </Container>
      <Divider />
      <Footer />
    </Root>
  )
}

export default Layout
