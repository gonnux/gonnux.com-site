import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import Link from 'next/link'

function ArticleList(props) {
  return (
    <List>
      {
        props
          .articles
          .sort((a, b) => {
            const dateDiff = (b.year - a.year) * 12 + (b.month - a.month) * 31 + (b.day - a.day)
            if (dateDiff != 0)
              return dateDiff
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
