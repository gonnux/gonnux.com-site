import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import React, { FC } from 'react'
import Link from 'next/link'
import { Article } from '../blog'

const ArticleList: FC<{ articles: Article[] }> = (props) => {
  return (
    <List>
      {
        props
          .articles
          .sort((a, b) => {
            const dateDiff = (b.year - a.year) * 12 + (b.month - a.month) * 31 + (b.day - a.day)
            if (dateDiff !== 0) return dateDiff
            return b.index - a.index
          })
          .map((article, idx) => (
            <React.Fragment key={`${article.year}${article.month}${article.day}${article.index}`}>
              <Link href={`/blog/${article.year}/${article.month}/${article.day}/${article.index}`}>
                <ListItem button>
                  <ListItemText primary={article.title} secondary={`${article.content.split('\n')[0]}...`} />
                </ListItem>
              </Link>
              { idx < props.articles.length - 1 && <Divider /> }
            </React.Fragment>
          ))
      }
    </List>
  )
}

export default ArticleList
