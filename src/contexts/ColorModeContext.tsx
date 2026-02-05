import type { ReactNode, FC } from 'react'
import { createContext, useContext, useCallback, useSyncExternalStore } from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'

type ColorMode = 'light' | 'dark'

interface ColorModeContextType {
  colorMode: ColorMode
  toggleColorMode: () => void
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined)

// 클라이언트 마운트 감지를 위한 useSyncExternalStore 패턴
const emptySubscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot)
}

// next-themes 래퍼 - 기존 useColorMode API 유지
const ColorModeContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { resolvedTheme, setTheme } = useTheme()
  const isMounted = useIsMounted()

  // SSR 및 마운트 전에는 dark를 기본값으로 사용 (하이드레이션 불일치 방지)
  const colorMode: ColorMode = isMounted ? (resolvedTheme as ColorMode) ?? 'dark' : 'dark'

  const toggleColorMode = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  )
}

// next-themes ThemeProvider + ColorModeContext를 함께 제공
export const ColorModeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      storageKey="color-mode"
    >
      <ColorModeContextProvider>
        {children}
      </ColorModeContextProvider>
    </NextThemesProvider>
  )
}

export const useColorMode = (): ColorModeContextType => {
  const context = useContext(ColorModeContext)
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider')
  }
  return context
}
