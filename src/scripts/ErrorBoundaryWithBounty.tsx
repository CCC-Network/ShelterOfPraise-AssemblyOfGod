// ErrorBoundaryWithBounty.tsx
import React from 'react';
import { useErrorBounty } from './useErrorBounty';

class ErrorBoundaryWithBounty extends React.Component<
  { children: React.ReactNode; componentName: string },
  { hasError: boolean }
> {
  private bounty: any;

  constructor(props: { children: React.ReactNode; componentName: string }) {
    super(props);
    this.state = { hasError: false };
    // This is a workaround to use hook in class component
    // In real implementation, you might want to use HOC or different pattern
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Capture error with bounty system
    if (this.bounty) {
      this.bounty.captureError(error, this.props.componentName, 'render', {
        errorInfo,
        stack: errorInfo.componentStack
      });
    }

    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryWithBounty;