import type { FC, ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { ColorModeProvider, useColorMode } from '@/contexts/ColorModeContext'
import ErrorBoundary from '@/components/ErrorBoundary'
import '@/styles/globals.css'
import 'highlight.js/styles/default.css'

type AppPropsWithLayout = AppProps & {
  Component: AppProps['Component'] & {
    getLayout?: (page: ReactNode) => ReactNode
  }
}

const defaultGetLayout = (page: ReactNode): ReactNode => page

const MyThemeProvider: FC<{children: ReactNode}> = ({ children }) => {
  const { colorMode } = useColorMode()

  const theme = createTheme({
    palette: {
      mode: colorMode,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

const App = ({
  Component,
  pageProps,
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? defaultGetLayout
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <ColorModeProvider>
      {/* Google Tag Manager - GA4는 GTM 콘솔에서 태그로 설정 */}
      {gtmId && (
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `
          }}
        />
      )}
      <MyThemeProvider>
        <CssBaseline />
        <ErrorBoundary>
          {getLayout(<Component {...pageProps} />)}
        </ErrorBoundary>
      </MyThemeProvider>
    </ColorModeProvider>
  )
}

export default App
