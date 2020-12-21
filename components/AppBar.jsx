import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import AppsIcon from '@material-ui/icons/Apps'
import Box from '@material-ui/core/Box'
import Brightness3Icon from '@material-ui/icons/Brightness3'
import Brightness5Icon from '@material-ui/icons/Brightness5'
import Container from '@material-ui/core/Container'
import GitHubIcon from '@material-ui/icons/GitHub'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import Link from 'next/link'
import ListAltIcon from '@material-ui/icons/ListAlt'
import MessageIcon from '@material-ui/icons/Message'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
  appBar: {
    flexGrow: 1,
  },
}))

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
          <Box display="flex" justifyContent="center">
            <Link href="/apps">
              <IconButton color="inherit">
                <AppsIcon />
              </IconButton>
            </Link>
            <Link href="/projects">
              <IconButton color="inherit">
                <ListAltIcon />
              </IconButton>
            </Link>
            <Link href="/blog">
              <IconButton color="inherit">
                <MessageIcon />
              </IconButton>
            </Link>
            <Link href="/about">
              <IconButton color="inherit">
                <InfoIcon />
              </IconButton>
            </Link>
            <Link href="https://github.com/binkoni">
              <IconButton color="inherit">
                <GitHubIcon />
              </IconButton>
            </Link>
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
