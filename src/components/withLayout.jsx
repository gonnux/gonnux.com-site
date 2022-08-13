import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import AppBar from './AppBar'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    overflowX: 'auto',
  },
}))

export default function withLayout(Component) {
  return function WithLayout(props) {
    const classes = useStyles()
    return (
      <>
        <AppBar />
        <Divider />
        <Container className={classes.container} maxWidth="sm">
          <Component {...props} />
        </Container>
      </>
    )
  }
}
