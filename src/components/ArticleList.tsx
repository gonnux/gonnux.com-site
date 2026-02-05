import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { FC, Fragment } from 'react'
import Link from 'next/link'
import { Article } from '@/blog'
import { getArticleUrl } from '@/utils/url'
import { compareArticlesDesc } from '@/utils/sort'

const ArticleList: FC<{ articles: Article[] }> = (props) => {
  return (
    <List component="section">
      {
        props
          .articles
          .sort(compareArticlesDesc)
          .map((article, idx) => {
            const articleUrl = getArticleUrl(article)
            return (
              <Box key={articleUrl} sx={{ wordBreak: 'break-all' }}>
                <Link href={articleUrl}>
                  <ListItemButton component="article">
                    <ListItemText primary={article.title} secondary={`${article.content.split('\n')[0]}...`} />
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
