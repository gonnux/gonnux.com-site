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
import type { FC } from 'react'
import { useColorMode } from '@/contexts/ColorModeContext'

interface LinkIcon {
  [0]: string,
  [1]: React.ReactNode
}

const linkIcons: LinkIcon[] = [
  ['/apps', <AppsIcon key='apps'/>],
  ['/projects', <ListAltIcon key='projects'/>],
  ['/blog', <MessageIcon key='blog'/>],
  ['/about', <InfoIcon key='about'/>],
  ['https://github.com/binkoni', <GitHubIcon key='github'/>],
]

const ColorModeButton: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton color="inherit" onClick={toggleColorMode}>
      {colorMode === 'light' ? <Brightness3Icon /> : <Brightness5Icon />}
    </IconButton>
  )
}

const AppBar: FC = () => {
  return (
    <MuiAppBar position="static" elevation={0} sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Container maxWidth="sm">
          <Box component="header" display="flex" justifyContent="center">
            <Typography variant="h3">
              <Link href="/">gonnux.com</Link>
            </Typography>
          </Box>
          <Divider />
          <Box component="nav" display="flex" justifyContent="center">
            {linkIcons.map((linkIcon) => (
              <IconButton key={linkIcon[0]} color="inherit" component={Link} href={linkIcon[0]}>
                {linkIcon[1]}
              </IconButton>
            ))}
            <ColorModeButton />
          </Box>
        </Container>
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar
