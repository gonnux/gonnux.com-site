import type { ReactNode, FC } from 'react'
import { createContext, useContext, useCallback, useSyncExternalStore } from 'react'

type ColorMode = 'light' | 'dark'

interface ColorModeContextType {
  colorMode: ColorMode
  toggleColorMode: () => void
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined)

const STORAGE_KEY = 'color-mode'

// localStorage를 외부 스토어로 사용 (useSyncExternalStore 패턴)
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function getSnapshot(): ColorMode {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  // 시스템 설정 확인
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
  return 'dark'
}

function getServerSnapshot(): ColorMode {
  return 'dark' // SSR 기본값
}

export const ColorModeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const colorMode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleColorMode = useCallback(() => {
    const next = colorMode === 'light' ? 'dark' : 'light'
    localStorage.setItem(STORAGE_KEY, next)
    // storage 이벤트는 같은 탭에서는 발생하지 않으므로 수동으로 리렌더 트리거
    window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }))
  }, [colorMode])

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  )
}

export const useColorMode = (): ColorModeContextType => {
  const context = useContext(ColorModeContext)
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider')
  }
  return context
}
