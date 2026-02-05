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

interface NavLink {
  href: string
  icon: React.ReactNode
  label: string
  external?: boolean
}

const navLinks: NavLink[] = [
  { href: '/apps', icon: <AppsIcon />, label: 'Apps' },
  { href: '/projects', icon: <ListAltIcon />, label: 'Projects' },
  { href: '/blog', icon: <MessageIcon />, label: 'Blog' },
  { href: '/about', icon: <InfoIcon />, label: 'About' },
  { href: 'https://github.com/binkoni', icon: <GitHubIcon />, label: 'GitHub', external: true },
]

const ColorModeButton: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <IconButton
      color="inherit"
      onClick={toggleColorMode}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      {isDark ? <Brightness5Icon /> : <Brightness3Icon />}
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
            {navLinks.map((link) => (
              <IconButton
                key={link.href}
                color="inherit"
                component={Link}
                href={link.href}
                aria-label={link.label}
                {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {link.icon}
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
