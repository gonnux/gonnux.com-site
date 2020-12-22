import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider';
import AppBar from './AppBar'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    overflowX: 'auto',
  },
}))

export default function withLayout(Component) {
  return (props) => {
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
