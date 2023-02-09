import React, { FC, ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AppContext, AppInitialProps, AppLayoutProps, AppProps } from 'next/app'
import { GetLayout, NextComponentType, NextLayoutPage } from 'next'
import Script from 'next/script'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { colorModeState } from '../states/colorMode'
import '../styles/globals.css'
import 'highlight.js/styles/default.css'


const defaultGetLayout: GetLayout<any> = (page: ReactNode): ReactNode => page

const MyThemeProvider: FC<{children: ReactNode}> = (props) => {
  const colorMode = useRecoilValue(colorModeState)

  const theme = createTheme({
    palette: {
      mode: colorMode,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      { props.children }
    </ThemeProvider>
  )
}

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
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
    <RecoilRoot>
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
      <MyThemeProvider>
        <CssBaseline />
        { getLayout(<Component {...pageProps} />) }
      </MyThemeProvider>
    </RecoilRoot>
  )
}

export default App
