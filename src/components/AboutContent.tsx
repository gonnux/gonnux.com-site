'use client'

import parse from 'html-react-parser'
import Box from '@mui/material/Box'

interface AboutContentProps {
  content: string
}

export default function AboutContent({ content }: AboutContentProps) {
  return (
    <Box component="article">
      {parse(content)}
    </Box>
  )
}
