import { makeStyles } from '@mui/styles'
import AppBar from '@mui/material/AppBar'
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

const useStyles = makeStyles(() => ({
  appBar: {
    flexGrow: 1,
  },
}))

const linkIcons = [
  ['/apps', <AppsIcon />],
  ['/projects', <ListAltIcon />],
  ['/blog', <MessageIcon />],
  ['/about', <InfoIcon />],
  ['https://github.com/binkoni', <GitHubIcon />],
]

export default function MyAppBar() {
  const classes = useStyles()
  return (
    <AppBar position="static" className={classes.appBar} elevation={0}>
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
            <IconButton color="inherit">
              <Brightness3Icon />
            </IconButton>
            <IconButton color="inherit">
              <Brightness5Icon />
            </IconButton>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
