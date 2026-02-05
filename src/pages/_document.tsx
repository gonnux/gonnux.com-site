import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* 기본 메타 태그 */}
          <meta charSet="utf-8" />

          {/* 테마 색상 - 라이트/다크 모드별 */}
          <meta name="theme-color" content="#1976d2" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#121212" media="(prefers-color-scheme: dark)" />

          {/* 파비콘 및 앱 아이콘 */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />

          {/* Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />

          {/* AdSense */}
          {process.env.NEXT_PUBLIC_ADSENSE_ID && (
            <Script
              id="adsense"
              strategy="afterInteractive"
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
              crossOrigin="anonymous"
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
