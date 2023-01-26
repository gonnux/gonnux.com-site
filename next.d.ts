import type {
  NextComponentType,
  NextPageContext,
  NextLayoutComponentType,
  NextPage
} from 'next'

import type { AppProps } from 'next/app'

declare module 'next' {
  type GetLayout<P> = (page: ReactNode, pageProps: P) => ReactNode
  type NextLayoutComponentType<C extends BaseContext = NextPageContext, IP = {}, P = {}> = NextComponentType<
    C,
    IP,
    P
  > & {
    getLayout?: GetLayout
  }
  type NextLayoutPage<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: GetLayout<P>
  }
}

declare module 'next/app' {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponentType
  }
}