import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AppProps } from 'next/app'
import '../styles/globals.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  // https://stackoverflow.com/a/59521406
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement!.removeChild(jssStyles)
  }, [])

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp