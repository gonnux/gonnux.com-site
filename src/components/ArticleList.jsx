import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import React from 'react'
import Link from 'next/link'

function ArticleList(props) {
  return (
    <List>
      {
        props.articles.map((article, idx) => (
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
