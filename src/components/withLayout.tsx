import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import AppBar from './AppBar'
import { NextPage } from 'next'

const PREFIX = 'withLayout';

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

export default function withLayout(Page: NextPage<any, any>) {
  return function WithLayout(props: any) {

    return (
      (<Root>
        <AppBar />
        <Divider />
        <Container className={classes.container} maxWidth="sm">
          <Page {...props} />
        </Container>
      </Root>)
    );
  };
}
