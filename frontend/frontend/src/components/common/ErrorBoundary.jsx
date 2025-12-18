import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={errorStyle}>
          <h2>Something went wrong!</h2>
          <p>Please refresh the page or contact support if the problem persists.</p>
          <button 
            onClick={() => window.location.reload()}
            style={buttonStyle}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const errorStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  textAlign: 'center',
  padding: '2rem'
};

const buttonStyle = {
  backgroundColor: '#2563eb',
  color: 'white',
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '0.25rem',
  cursor: 'pointer',
  marginTop: '1rem'
};

export default ErrorBoundary;