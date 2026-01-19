import { ReactNode } from 'react'
import { Metadata } from 'next'
import Script from 'next/script'
import Providers from '../components/Providers'
import LayoutContent from '../components/LayoutContent'
import './globals.css'
import 'highlight.js/styles/default.css'

export const metadata: Metadata = {
  title: 'gonnux.com',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
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
      <body>
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
