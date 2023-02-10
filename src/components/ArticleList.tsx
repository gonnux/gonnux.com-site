import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { FC, Fragment } from 'react'
import Link from 'next/link'
import { Article } from '../blog'

const ArticleList: FC<{ articles: Article[] }> = (props) => {
  return (
    <List component="section">
      {
        props
          .articles
          .sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year
            if (a.month !== b.month) return b.month - a.month
            if (a.day !== b.day) return b.day - a.day
            if (a.index !== b.index) return b.index - a.index
            return 0
          })
          .map((article, idx) => {
            const articleUrl = `/blog/${article.year}/${article.month}/${article.day}/${article.index}`
            return (
              <Box key={articleUrl} sx={{ wordBreak: 'break-all' }}>
                <Link
                  href={articleUrl}
                >
                  <a href={articleUrl}>
                    <ListItem component="article" button>
                      <ListItemText primary={article.title} secondary={`${article.content.split('\n')[0]}...`} />
                    </ListItem>
                  </a>
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
