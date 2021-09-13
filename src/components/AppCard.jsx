import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

// https://stackoverflow.com/questions/5445491/height-equal-to-dynamic-width-css-fluid-layout
const useStyles = makeStyles((theme) => ({
  cardMedia: {
    display: 'inline-block',
    height: '0',
    paddingBottom: '100%',
    width: '100%',
  },
  cardContent: {
    padding: theme.spacing(0),
  },
}))

export default function AppCard(props) {
  const classes = useStyles()

  return (
    <Card className={classes.card} elevation={0}>
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          alt={props.name}
          image={props.image}
        />
        <CardContent className={classes.cardContent}>
          <Typography align="center">
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
