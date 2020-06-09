import React, { Component, ErrorInfo } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}
class ErrorBoundary extends Component<{ children: JSX.Element }, ErrorBoundaryState> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service

    this.setState({
      hasError: true,
      error,
      errorInfo,
    })
  }

  render(): JSX.Element {
    const { children } = this.props
    const { hasError, error, errorInfo } = this.state
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <hr />
          <h3>{error && error.toString()}</h3>
          <br />
          <h3>{errorInfo && errorInfo.componentStack}</h3>
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundary
