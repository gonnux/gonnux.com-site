import { makeStyles } from '@mui/styles'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

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
