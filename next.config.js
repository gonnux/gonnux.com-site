/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' www.googletagmanager.com pagead2.googlesyndication.com *.disqus.com *.disquscdn.com *.liadm.com *.adtrafficquality.google",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com *.disquscdn.com",
              "font-src 'self' fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' www.google-analytics.com *.disqus.com *.google.com *.doubleclick.net *.googlesyndication.com *.adtrafficquality.google links.services.disqus.com",
              "frame-src 'self' disqus.com *.disqus.com *.google.com *.doubleclick.net *.googlesyndication.com tpc.googlesyndication.com",
              "frame-ancestors 'self'",
            ].join('; '),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
