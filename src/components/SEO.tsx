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
  noindex?: boolean
}

// 재사용 가능한 SEO 컴포넌트
// 모든 페이지에서 일관된 메타데이터를 제공
const SEO: FC<SEOProps> = ({
  site,
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  article,
  noindex = false,
}) => {
  const fullTitle = title ? `${title} | ${site.name}` : site.name
  const metaDescription = description ?? site.description
  const canonicalUrl = canonical ? `${site.url}${canonical}` : undefined

  return (
    <Head>
      {/* 기본 메타 태그 */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph 태그 - 소셜 미디어 공유용 */}
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

      {/* 게시글 전용 메타 태그 */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:author" content={article.author ?? site.author} />
        </>
      )}
    </Head>
  )
}

export default SEO
