import type { ReactNode } from 'react';
import { Component } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

// React Error Boundary - 자식 컴포넌트에서 발생한 에러를 잡아서 fallback UI 표시
// 클래스 컴포넌트로만 구현 가능 (getDerivedStateFromError, componentDidCatch)
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 에러 로깅 (프로덕션에서는 Sentry 등 외부 서비스로 전송 가능)
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            gap: 2,
            p: 3,
          }}
        >
          <Typography variant="h5" component="h1">
            문제가 발생했습니다
          </Typography>
          <Typography variant="body1" color="text.secondary">
            페이지를 불러오는 중 오류가 발생했습니다.
          </Typography>
          <Button variant="contained" onClick={this.handleReload}>
            페이지 새로고침
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
