import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import React, { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const DateList: FC<{ dates: number[] }> = (props) => {
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
