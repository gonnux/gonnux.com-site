import React, { ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AppContext, AppInitialProps, AppLayoutProps, AppProps } from 'next/app'
import '../styles/globals.css'
import { GetLayout, NextComponentType, NextLayoutPage } from 'next'
import Script from 'next/script'

const defaultGetLayout: GetLayout<any> = (page: ReactNode): ReactNode => page

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {

  const getLayout = Component.getLayout ?? defaultGetLayout

  // https://stackoverflow.com/a/59521406
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement!.removeChild(jssStyles)
  }, [])

  return (
    <>
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-NQHQBR591P"/>
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NQHQBR591P');
          `
        }}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        { getLayout(<Component {...pageProps} />) }
      </ThemeProvider>
    </>
  )
}

export default MyApp
