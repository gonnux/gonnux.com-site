import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import type { FC } from 'react'
import Box from '@mui/material/Box'
import Image from 'next/image'

// AppCard - 앱/프로젝트 카드 컴포넌트
// Next.js Image 사용으로 WebP 자동 변환, lazy loading 적용
const AppCard: FC<{ name: string; image: string }> = ({ name, image }) => {
  return (
    <Box component="article">
      <Card elevation={0}>
        <CardActionArea>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              paddingBottom: '100%', // 1:1 비율 유지
            }}
          >
            <Image
              src={image}
              alt={`${name} 앱 이미지`}
              fill
              sizes="(max-width: 600px) 25vw, 16vw"
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <CardContent component="footer" sx={{ padding: 0 }}>
            <Typography align="center">{name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
}

export default AppCard
