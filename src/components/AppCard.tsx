import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import Box from '@mui/material/Box'

const PREFIX = 'AppCard'

const classes = {
  cardMedia: `${PREFIX}-cardMedia`,
  cardContent: `${PREFIX}-cardContent`
}

const StyledCard = styled(Card)((
  {
    theme
  }
) => ({
  [`& .${classes.cardMedia}`]: {
    display: 'inline-block',
    height: '0',
    paddingBottom: '100%',
    width: '100%',
  },

  [`& .${classes.cardContent}`]: {
    padding: theme.spacing(0),
  }
}))

const AppCard: FC<{name: string, image: string}> = (props) => {
  return (
    <Box component="article">
      <StyledCard elevation={0}>
        <CardActionArea>
          <CardMedia
            className={classes.cardMedia}
            image={props.image}
          />
          <CardContent component="footer" className={classes.cardContent}>
            <Typography align="center">
              {props.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </StyledCard>
    </Box>
  )
}

export default AppCard
