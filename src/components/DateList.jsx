import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

function DateList(props) {
  const router = useRouter()
  return (
    <List>
      {
        props.dates.map((date, idx) => (
          <React.Fragment key={date}>
            <Link href={`${router.asPath}/${date}`}>
              <ListItem button>
                <ListItemText primary={date} />
              </ListItem>
            </Link>
            { idx < props.dates.length - 1 && <Divider /> }
          </React.Fragment>
        ))
      }
    </List>
  )
}

export default DateList
