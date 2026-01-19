'use client'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import ArticleList from './ArticleList'
import AppList from './AppList'
import ProjectList from './ProjectList'
import { Article } from '../blog'
import { App, Project } from '../config'

interface HomeContentProps {
  articles: Article[]
  apps: App[]
  projects: Project[]
}

export default function HomeContent({ articles, apps, projects }: HomeContentProps) {
  return (
    <>
      <Box component="section">
        <Box component="header">
          <Typography variant="h5">Apps</Typography>
        </Box>
        <AppList apps={apps} />
      </Box>
      <Divider />
      <Box component="section">
        <Box component="header">
          <Typography variant="h5">Projects</Typography>
        </Box>
        <ProjectList projects={projects} />
      </Box>
      <Divider />
      <Box component="section">
        <Box component="header">
          <Typography variant="h5">Articles</Typography>
        </Box>
        <ArticleList articles={articles} />
      </Box>
    </>
  )
}
