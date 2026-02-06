import { Home, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { NextLayoutPage } from '@/types/layout'
import Layout from '@/components/Layout'

const NotFoundPage: NextLayoutPage = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-5xl font-bold mb-4">
        404
      </h1>
      <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
        Page not found
      </p>
      <p className="text-base text-gray-500 dark:text-gray-400 mb-8">
        The page you are looking for does not exist.
      </p>
      <div className="flex gap-2 justify-center flex-wrap">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <Home size={18} />
          Home
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        >
          <MessageSquare size={18} />
          Blog
        </Link>
      </div>
    </div>
  )
}

NotFoundPage.getLayout = (page: ReactNode) => (<Layout>{page}</Layout>)

export default NotFoundPage
