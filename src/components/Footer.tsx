import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import type { FC } from 'react'

const Footer: FC = () => {
  const githubRemoteUrl = process.env.NEXT_PUBLIC_GITHUB_REMOTE_URL
  const gitCommitHash = process.env.NEXT_PUBLIC_GIT_COMMIT_HASH
  const githubCommitUrl = `${githubRemoteUrl}/commit/${gitCommitHash}`

  return (
    <Box component="footer">
      <Box display="flex" justifyContent="center">
        <Typography>
          <Link href={ githubCommitUrl }>
            { gitCommitHash }
          </Link>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography>
          &copy; { new Date().getFullYear() } Gonnux. All Right Reserved.
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer
