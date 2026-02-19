import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import type { FC } from 'react'
import Link from 'next/link'
import type { Article } from '@/blog'
import { getArticleUrl } from '@/utils/url'
import { compareArticlesDesc } from '@/utils/sort'

const ArticleList: FC<{ articles: Article[] }> = (props) => {
  return (
    <List component="section">
      {
        [...props.articles]
          .sort(compareArticlesDesc)
          .map((article, idx) => {
            const articleUrl = getArticleUrl(article)
            return (
              <Box key={article.slug} sx={{ wordBreak: 'break-all' }}>
                <Link href={articleUrl}>
                  <ListItemButton component="article">
                    <ListItemText
                      primary={article.title}
                      secondary={`${article.created} · ${article.excerpt.length > 60 ? article.excerpt.slice(0, 60) + '...' : article.excerpt}`}
                    />
                  </ListItemButton>
                </Link>
                { idx < props.articles.length - 1 && <Divider /> }
              </Box>
            )
          })
      }
    </List>
  )
}

export default ArticleList
