import { ReactNode } from 'react'
import { Metadata } from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import Providers from '../components/Providers'
import LayoutContent from '../components/LayoutContent'
import './globals.css'
import 'highlight.js/styles/default.css'

const roboto = localFont({
  src: '../fonts/Roboto-VariableFont.woff2',
  display: 'swap',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: {
    default: 'gonnux.com',
    template: '%s | gonnux.com',
  },
  description: 'Personal website of gonnux - projects, apps, and blog',
  metadataBase: new URL('https://gonnux.com'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://gonnux.com',
    siteName: 'gonnux.com',
    title: 'gonnux.com',
    description: 'Personal website of gonnux - projects, apps, and blog',
  },
  twitter: {
    card: 'summary',
    title: 'gonnux.com',
    description: 'Personal website of gonnux - projects, apps, and blog',
  },
  alternates: {
    canonical: 'https://gonnux.com',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  return (
    <html lang="en">
      <head>
        {adsenseId && (
          <Script
            id="adsense"
            strategy="beforeInteractive"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className={roboto.className}>
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
                `,
              }}
            />
          </>
        )}
        <Providers>
          <LayoutContent>{children}</LayoutContent>
        </Providers>
      </body>
    </html>
  )
}
