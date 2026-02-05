import type { ReactNode } from 'react'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import '@/styles/globals.css'
import 'highlight.js/styles/default.css'

type AppPropsWithLayout = AppProps & {
  Component: AppProps['Component'] & {
    getLayout?: (page: ReactNode) => ReactNode
  }
}

const defaultGetLayout = (page: ReactNode): ReactNode => page

const App = ({
  Component,
  pageProps,
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? defaultGetLayout
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {gaId && (
        <>
          <Script
            id="google-analytics-tag"
            strategy="afterInteractive"
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `
            }}
          />
        </>
      )}
      <ErrorBoundary>
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
