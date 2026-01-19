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


  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <RecoilRoot>
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
        { getLayout(<Component {...pageProps} />) }
      </MyThemeProvider>
    </RecoilRoot>
  )
}

export default App
