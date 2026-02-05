import type { FC } from 'react'
import Link from 'next/link'
import type { Article } from '@/blog'
import { getArticleUrl } from '@/utils/url'
import { compareArticlesDesc } from '@/utils/sort'

const ArticleList: FC<{ articles: Article[] }> = ({ articles }) => {
  const sortedArticles = [...articles].sort(compareArticlesDesc)

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {sortedArticles.map((article) => {
        const articleUrl = getArticleUrl(article)
        return (
          <li key={articleUrl}>
            <Link
              href={articleUrl}
              className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors break-all"
            >
              <article>
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {article.excerpt.length > 60
                    ? article.excerpt.slice(0, 60) + '...'
                    : article.excerpt}
                </p>
              </article>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default ArticleList
