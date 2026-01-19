'use client'

import { FC } from 'react'
import { DiscussionEmbed } from 'disqus-react'

interface DisqusCommentsProps {
  url: string
  identifier: string
  title: string
}

const DisqusComments: FC<DisqusCommentsProps> = ({ url, identifier, title }) => {
  const disqusShortName = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME

  if (!disqusShortName) {
    return null
  }

  const disqusConfig = {
    url,
    identifier,
    title,
  }

  return (
    <DiscussionEmbed
      shortname={disqusShortName}
      config={disqusConfig}
    />
  )
}

export default DisqusComments
