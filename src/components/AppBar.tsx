import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar'
import AppsIcon from '@mui/icons-material/Apps'
import Box from '@mui/material/Box'
import Brightness3Icon from '@mui/icons-material/Brightness3'
import Brightness5Icon from '@mui/icons-material/Brightness5'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import GitHubIcon from '@mui/icons-material/GitHub'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'
import Link from 'next/link'
import ListAltIcon from '@mui/icons-material/ListAlt'
import MessageIcon from '@mui/icons-material/Message'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'
import { colorModeState } from '../states/colorMode'
import { useRecoilState } from 'recoil'

const PREFIX = 'AppBar';

const classes = {
  appBar: `${PREFIX}-appBar`
};

const StyledMuiAppBar = styled(MuiAppBar)(() => ({
  [`&.${classes.appBar}`]: {
    flexGrow: 1,
  }
}));

interface LinkIcon {
  [0]: string,
  [1]: any
}

const linkIcons: LinkIcon[] = [
  ['/apps', <AppsIcon key='apps'/>],
  ['/projects', <ListAltIcon key='projects'/>],
  ['/blog', <MessageIcon key='blog'/>],
  ['/about', <InfoIcon key='about'/>],
  ['https://github.com/binkoni', <GitHubIcon key='github'/>],
]

const ColorModeButton: FC = () => {
  const [colorMode, setColorMode] = useRecoilState(colorModeState)
  return (<>
    <IconButton
      color="inherit"
      onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light') }
    >
      { colorMode === 'light' ? <Brightness3Icon /> : <Brightness5Icon /> }
    </IconButton>
  </>)
}

const AppBar: FC = () => {

  return (
    <StyledMuiAppBar position="static" className={classes.appBar} elevation={0}>
      <Toolbar>
        <Container maxWidth="sm">
          <Box display="flex" justifyContent="center">
            <Typography variant="h3">
              <Link href="/">
                gonnux.com
              </Link>
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="center">
            {
              linkIcons.map((linkIcon) => (
                <Link key={linkIcon[0]} href={linkIcon[0]}>
                  <IconButton color="inherit">{linkIcon[1]}</IconButton>
                </Link>
              ))
            }
            <ColorModeButton />
          </Box>
        </Container>
      </Toolbar>
    </StyledMuiAppBar>
  );
}

export default AppBar
