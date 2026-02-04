import Grid from '@mui/material/Grid'
import Link from 'next/link'
import { EMPTY_IMAGE } from '@/constants'
import AppCard from './AppCard'

interface GridCardListProps<T> {
  items: T[]
  getUrl: (item: T) => string
  getName: (item: T) => string
  getImage: (item: T) => string | undefined
  component?: 'section' | 'div'
}

// 제네릭 그리드 카드 리스트 컴포넌트
// AppList와 ProjectList의 공통 로직을 추출
function GridCardList<T>({ items, getUrl, getName, getImage, component = 'div' }: GridCardListProps<T>) {
  return (
    <Grid component={component} container spacing={2}>
      {items.map((item) => {
        const url = getUrl(item)
        const name = getName(item)
        return (
          <Grid key={name} item xs={3} md={2}>
            <Link href={url}>
              <AppCard name={name} image={getImage(item) ?? EMPTY_IMAGE} />
            </Link>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default GridCardList
