import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // https://stackoverflow.com/a/59521406
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
