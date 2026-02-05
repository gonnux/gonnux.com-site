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
function GridCardList<T>({
  items,
  getUrl,
  getName,
  getImage,
  component: Component = 'div',
}: GridCardListProps<T>) {
  return (
    <Component className="grid grid-cols-4 md:grid-cols-6 gap-4">
      {items.map((item) => {
        const url = getUrl(item)
        const name = getName(item)
        return (
          <Link key={name} href={url}>
            <AppCard name={name} image={getImage(item) ?? EMPTY_IMAGE} />
          </Link>
        )
      })}
    </Component>
  )
}

export default GridCardList
