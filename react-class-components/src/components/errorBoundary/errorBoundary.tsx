import { Component, ErrorInfo, ReactNode } from 'react';

interface MyErrorBoundaryProps {
    children: ReactNode;
}

interface MyErrorBoundaryState {
    hasError: boolean;
}

export default class MyErrorBoundary extends Component<MyErrorBoundaryProps, MyErrorBoundaryState> {
    constructor(props: MyErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(): MyErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('My error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1 className="fallback">Something went wrong.</h1>;
        }
        return this.props.children;
    }
}
