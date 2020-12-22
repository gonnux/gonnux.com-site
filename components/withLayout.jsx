import { makeStyles } from '@material-ui/core/styles'
import AppBar from './AppBar'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}))

export default function withLayout(Component) {
  return (props) => {
    const classes = useStyles()
    return <>
      <AppBar />
      <Container className={classes.container} maxWidth="sm">
        <Component {...props} />
      </Container>
    </>
  }
}
