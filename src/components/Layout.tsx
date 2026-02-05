import type { FC, ReactNode } from 'react'
import AppBar from './AppBar'
import Footer from './Footer'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <AppBar />
      <hr className="border-gray-200 dark:border-gray-700" />
      <main className="mx-auto max-w-[900px] px-4 py-4 overflow-x-auto">
        {children}
      </main>
      <hr className="border-gray-200 dark:border-gray-700" />
      <Footer />
    </>
  )
}

export default Layout
