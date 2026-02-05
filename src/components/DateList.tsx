import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import type { FC} from 'react';
import { Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const DateList: FC<{ dates: number[] }> = (props) => {
  const router = useRouter()
  return (
    <List>
      {
        props.dates.map((date, idx) => (
          <Fragment key={date}>
            <Link href={`${router.asPath}/${date}`}>
              <ListItemButton>
                <ListItemText primary={date} />
              </ListItemButton>
            </Link>
            { idx < props.dates.length - 1 && <Divider /> }
          </Fragment>
        ))
      }
    </List>
  )
}

export default DateList
