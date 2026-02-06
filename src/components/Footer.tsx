import type { FC } from 'react'

const Footer: FC = () => {
  const githubRemoteUrl = process.env.NEXT_PUBLIC_GITHUB_REMOTE_URL
  const gitCommitHash = process.env.NEXT_PUBLIC_GIT_COMMIT_HASH
  const githubCommitUrl = `${githubRemoteUrl}/commit/${gitCommitHash}`

  return (
    <footer className="py-4">
      <div className="flex justify-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <a href={githubCommitUrl} className="hover:underline">
            {gitCommitHash}
          </a>
        </p>
      </div>
      <div className="flex justify-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Gonnux. All Right Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
