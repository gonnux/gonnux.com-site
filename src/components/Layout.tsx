import type { FC, ReactNode } from 'react'
import AppBar from './AppBar'
import Footer from './Footer'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <AppBar />
      {/* MUI Divider 대체 - 테마 색상에 맞춘 구분선 */}
      <hr className="border-gray-200 dark:border-gray-700" />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 overflow-x-auto">
        {children}
      </main>
      <hr className="border-gray-200 dark:border-gray-700" />
      <Footer />
    </>
  )
}

export default Layout
