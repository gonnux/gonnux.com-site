'use client'

import parse from 'html-react-parser'
import Divider from '@mui/material/Divider'
import GitHubIcon from '@mui/icons-material/GitHub'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'

interface ProjectContentProps {
  gitUrl: string
  markdown: string
}

export default function ProjectContent({ gitUrl, markdown }: ProjectContentProps) {
  return (
    <>
      <Link href={gitUrl}>
        <IconButton color="inherit">
          <GitHubIcon />
        </IconButton>
      </Link>
      <Divider />
      {parse(markdown)}
    </>
  )
}
