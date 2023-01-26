import type {
  NextComponentType,
  NextPageContext,
  NextLayoutComponentType,
  NextPage
} from 'next'

import type { AppProps } from 'next/app'

declare module 'next' {
  type GetLayout = (page: ReactNode) => ReactNode
  type NextLayoutComponentType<C extends BaseContext = NextPageContext, IP = {}, P = {}> = NextComponentType<
    C,
    IP,
    P
  > & {
    getLayout?: GetLayout
  }
  type NextLayoutPage<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: GetLayout
  }
}

declare module 'next/app' {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponentType
  }
}