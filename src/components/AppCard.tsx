import type { FC } from 'react'
import Image from 'next/image'

// AppCard - 앱/프로젝트 카드 컴포넌트
// Next.js Image 사용으로 WebP 자동 변환, lazy loading 적용
const AppCard: FC<{ name: string; image: string }> = ({ name, image }) => {
  return (
    <article className="group">
      <div className="rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
        <div className="relative w-full pb-[100%]">
          <Image
            src={image}
            alt={`${name} 앱 이미지`}
            fill
            sizes="(max-width: 600px) 25vw, 16vw"
            className="object-cover"
          />
        </div>
        <footer className="py-2">
          <p className="text-center text-sm text-gray-900 dark:text-gray-100">
            {name}
          </p>
        </footer>
      </div>
    </article>
  )
}

export default AppCard
