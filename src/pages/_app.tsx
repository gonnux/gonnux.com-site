import { FC, ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Script from 'next/script'
import { ColorModeProvider, useColorMode } from '@/contexts/ColorModeContext'
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <ColorModeProvider>
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
      <MyThemeProvider>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </MyThemeProvider>
    </ColorModeProvider>
  )
}

export default App
