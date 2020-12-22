import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import withLayout from '../components/withLayout'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}))

function Apps() {
  const classes = useStyles()
  return (
    <>
      <Container className={classes.container} maxWidth="sm">
        <h1>Home</h1>
      </Container>
    </>
  )
}

export default withLayout(Apps)
