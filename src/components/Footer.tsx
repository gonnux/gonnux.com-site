import type { FC } from 'react'

const Footer: FC = () => {
  const githubRemoteUrl = process.env.NEXT_PUBLIC_GITHUB_REMOTE_URL
  const gitCommitHash = process.env.NEXT_PUBLIC_GIT_COMMIT_HASH
  const githubCommitUrl = `${githubRemoteUrl}/commit/${gitCommitHash}`

  return (
    <footer className="py-4">
      <div className="flex justify-center">
        <a
          href={githubCommitUrl}
          className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {gitCommitHash}
        </a>
      </div>
      <div className="flex justify-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Gonnux. All Right Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
