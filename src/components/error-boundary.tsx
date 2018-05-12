import * as React from 'react'

export class ErrorBoundary extends React.Component<any, any> {
  state = { hasError: false }

  componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true })
    console.log('What to do')
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}
