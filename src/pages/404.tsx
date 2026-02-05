import Link from 'next/link'
import { Home, MessageSquare } from 'lucide-react'
import type { ReactNode } from 'react'
import type { NextLayoutPage } from '@/types/layout'
import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'

const NotFoundPage: NextLayoutPage = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-light text-gray-900 dark:text-gray-100 mb-4">
        404
      </h1>
      <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">
        Page not found
      </h2>
      <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
        The page you are looking for does not exist.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Button asChild>
          <Link href="/">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/blog">
            <MessageSquare className="h-4 w-4" />
            Blog
          </Link>
        </Button>
      </div>
    </div>
  )
}

NotFoundPage.getLayout = (page: ReactNode) => (<Layout>{page}</Layout>)

export default NotFoundPage
