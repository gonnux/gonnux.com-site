import type { GetStaticPaths, GetStaticProps } from 'next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import parse from 'html-react-parser'
import { DiscussionEmbed } from 'disqus-react'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'
import type { Article } from '@/blog'
import type { Site } from '@/config'
import type { NextLayoutPage } from '@/types/layout'

type Props = {
  site: Site
  article: Article
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllSlugs } = await import('@/blog')
  const slugs = await getAllSlugs()
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { getArticle } = await import('@/blog')
  const { default: config } = await import('@/config')
  const slug = params?.slug as string
  const article = await getArticle(slug)

  if (!article) {
    return { notFound: true }
  }

  return {
    props: { site: config.site, article },
    revalidate: 86400,
  }
}

// Primary tags to exclude from display chips
const PRIMARY_TAGS = new Set(['literature', 'permanent', 'reference', 'auxiliary', 'fleeting'])

const ArticlePage: NextLayoutPage<Props> = ({ site, article }) => {
  const disqusShortName = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME
  const disqusConfig = {
    url: `https://gonnux.com/blog/${article.slug}`,
    identifier: article.slug,
    title: article.title,
  }

  return (
    <>
      <SEO
        site={site}
        title={article.title}
        description={article.excerpt}
        ogType="article"
        article={{ publishedTime: article.created, author: site.author }}
        canonical={`/blog/${article.slug}`}
      />
      <article>
        <Typography variant="h4" component="h1" gutterBottom>
          {article.title}
        </Typography>
        <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {article.created}
          </Typography>
          {article.tags
            .filter((tag) => !PRIMARY_TAGS.has(tag))
            .map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
        </Box>
        <Box className="prose prose-lg dark:prose-invert max-w-none">
          {parse(article.content)}
        </Box>
      </article>
      <Divider sx={{ my: 4 }} />
      {disqusShortName && (
        <DiscussionEmbed
          shortname={disqusShortName}
          config={disqusConfig}
        />
      )}
    </>
  )
}

ArticlePage.getLayout = (page) => <Layout>{page}</Layout>

export default ArticlePage
