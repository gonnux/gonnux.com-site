import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import AppBar from './AppBar'
import { FC, ReactNode } from 'react'

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
  const githubRemoteUrl = process.env.NEXT_PUBLIC_GITHUB_REMOTE_URL
  const gitCommitHash = process.env.NEXT_PUBLIC_GIT_COMMIT_HASH
  const githubCommitUrl = `${githubRemoteUrl}/commit/${gitCommitHash}`

  return (
    (<Root>
      <AppBar />
      <Divider />
      <Container className={classes.container} maxWidth="sm">
        { children }
      </Container>
      <Divider />
      <Box display="flex" justifyContent="center">
        <Typography>
          <Link href={ githubCommitUrl }>
            { gitCommitHash }
          </Link>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography>
          &copy; { new Date().getFullYear() } Gonnux. All Right Reserved.
        </Typography>
      </Box>
    </Root>)
  );
}

export default Layout
