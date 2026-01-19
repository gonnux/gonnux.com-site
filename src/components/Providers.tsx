'use client'

import { FC, ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { colorModeState } from '../states/colorMode'

const ThemeProviderWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const colorMode = useRecoilValue(colorModeState)

  const theme = createTheme({
    palette: {
      mode: colorMode,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <RecoilRoot>
      <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
    </RecoilRoot>
  )
}

export default Providers
