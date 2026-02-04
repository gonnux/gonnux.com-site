import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import Box from '@mui/material/Box'

const AppCard: FC<{ name: string; image: string }> = ({ name, image }) => {
  return (
    <Box component="article">
      <Card elevation={0}>
        <CardActionArea>
          <CardMedia
            image={image}
            sx={{
              display: 'inline-block',
              height: 0,
              paddingBottom: '100%',
              width: '100%',
            }}
          />
          <CardContent component="footer" sx={{ padding: 0 }}>
            <Typography align="center">{name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
}

export default AppCard
