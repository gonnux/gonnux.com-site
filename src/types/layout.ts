import type { NextPage } from 'next'
import type { ReactNode } from 'react'

// 페이지별 레이아웃 지원을 위한 커스텀 타입
// Next.js Pages Router에서 per-page layout 패턴 구현에 사용
export type GetLayout<P = Record<string, unknown>> = (page: ReactNode, pageProps?: P) => ReactNode

export type NextLayoutPage<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout<P>
}
