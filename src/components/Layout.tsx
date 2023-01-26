import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import AppBar from './AppBar'
import { FC, ReactNode } from 'react';


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
    (<Root>
      <AppBar />
      <Divider />
      <Container className={classes.container} maxWidth="sm">
        { children }
      </Container>
    </Root>)
  );
}

export default Layout