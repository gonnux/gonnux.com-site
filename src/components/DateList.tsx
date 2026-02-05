import type { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const DateList: FC<{ dates: number[] }> = ({ dates }) => {
  const router = useRouter()

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {dates.map((date) => (
        <li key={date}>
          <Link
            href={`${router.asPath}/${date}`}
            className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="text-base font-medium text-gray-900 dark:text-gray-100">
              {date}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default DateList
