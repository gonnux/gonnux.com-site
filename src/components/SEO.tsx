import Head from 'next/head'
import type { FC } from 'react'
import type { Site } from '@/config'

interface SEOProps {
  site: Site
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  article?: {
    publishedTime: string
    author?: string
  }
  // 페이지네이션 시 크롤러에게 이전/다음 페이지 힌트 제공
  pagination?: {
    prev?: string
    next?: string
  }
  noindex?: boolean
}

// Reusable SEO component for consistent metadata across all pages
const SEO: FC<SEOProps> = ({
  site,
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  article,
  pagination,
  noindex = false,
}) => {
  const fullTitle = title ? `${title} | ${site.name}` : site.name
  const metaDescription = description ?? site.description
  const canonicalUrl = canonical ? `${site.url}${canonical}` : undefined

  return (
    <Head>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* 페이지네이션: 크롤러에게 이전/다음 페이지 힌트 제공 */}
      {pagination?.prev && <link rel="prev" href={`${site.url}${pagination.prev}`} />}
      {pagination?.next && <link rel="next" href={`${site.url}${pagination.next}`} />}

      {/* Open Graph tags for social media sharing */}
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter Card 태그 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Article meta tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:author" content={article.author ?? site.author} />
        </>
      )}

      {/* JSON-LD structured data for rich search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            article
              ? {
                  '@context': 'https://schema.org',
                  '@type': 'BlogPosting',
                  headline: fullTitle,
                  description: metaDescription,
                  image: ogImage,
                  datePublished: article.publishedTime,
                  author: {
                    '@type': 'Person',
                    name: article.author ?? site.author,
                  },
                  publisher: {
                    '@type': 'Person',
                    name: site.author,
                  },
                  mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': canonicalUrl,
                  },
                }
              : {
                  '@context': 'https://schema.org',
                  '@type': 'WebSite',
                  name: site.name,
                  url: site.url,
                  description: metaDescription,
                  author: {
                    '@type': 'Person',
                    name: site.author,
                  },
                }
          ),
        }}
      />
    </Head>
  )
}

export default SEO
