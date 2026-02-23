import type { FC } from 'react'
import MuiPagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Box from '@mui/material/Box'
import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

// 페이지 번호에 해당하는 URL 반환
// 1페이지는 /blog (canonical), 2페이지 이후는 /blog/page/N
function getPageUrl(page: number): string {
  return page === 1 ? '/blog' : `/blog/page/${page}`
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages }) => {
  // 페이지가 1개뿐이면 페이지네이션 불필요
  if (totalPages <= 1) return null

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            href={getPageUrl(item.page ?? 1)}
            {...item}
          />
        )}
      />
    </Box>
  )
}

export default Pagination
