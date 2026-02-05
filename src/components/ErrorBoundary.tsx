import type { ReactNode } from 'react'
import { Component } from 'react'
import { Button } from '@/components/ui/button'

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
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-6">
          <h1 className="text-xl font-medium text-gray-900 dark:text-gray-100">
            문제가 발생했습니다
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            페이지를 불러오는 중 오류가 발생했습니다.
          </p>
          <Button onClick={this.handleReload}>
            페이지 새로고침
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
