import { ReactNode } from 'react'
import { Metadata } from 'next'
import Script from 'next/script'
import { Roboto } from 'next/font/google'
import Providers from '../components/Providers'
import LayoutContent from '../components/LayoutContent'
import './globals.css'
import 'highlight.js/styles/default.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'gonnux.com',
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
