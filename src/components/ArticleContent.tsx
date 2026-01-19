'use client'

import parse from 'html-react-parser'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { Article } from '../blog'
import DisqusComments from './DisqusComments'

interface ArticleContentProps {
  article: Article
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const articleUrl = `https://gonnux.com/blog/${article.year}/${article.month}/${article.day}/${article.index}`
  const articleIdentifier = `${article.year}/${article.month}/${article.day}/${article.index}`

  return (
    <>
      <Typography variant="h4">{article.title}</Typography>
      <Breadcrumbs>
        <Link color="inherit" href={`/blog/${article.year}`}>
          {article.year}
        </Link>
        <Link color="inherit" href={`/blog/${article.year}/${article.month}`}>
          {article.month}
        </Link>
        <Link
          color="inherit"
          href={`/blog/${article.year}/${article.month}/${article.day}`}
        >
          {article.day}
        </Link>
        <Link
          color="inherit"
          href={`/blog/${article.year}/${article.month}/${article.day}/${article.index}`}
        >
          {article.index}
        </Link>
      </Breadcrumbs>
      <Divider />
      <Box component="article">{parse(article.content)}</Box>
      <Divider />
      <DisqusComments
        url={articleUrl}
        identifier={articleIdentifier}
        title={article.title}
      />
    </>
  )
}
