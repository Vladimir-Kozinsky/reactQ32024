import React, { ErrorInfo, ReactNode } from 'react';

type ErrorBoundaryProps = {
  fallback: string;
  children: ReactNode;
};

type StateType = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, StateType> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;
    if (hasError) {
      return <p>{fallback}</p>;
    }
    return children;
  }
}

export default ErrorBoundary;
