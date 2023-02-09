import { atom } from 'recoil'
export type ColorMode = 'light' | 'dark'
export const colorModeState = atom<ColorMode>({
  key: 'colorMode',
  default: 'dark'
})
