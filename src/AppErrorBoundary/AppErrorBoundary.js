import React, { Component } from 'react';

class AppErrorBoundary extends Component {
    
    state = {
        hasError: false,
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <>
                    <h1>Error</h1>
                    <p>Sorry, but something went wrong.  Check your connection and try again.</p>
                </>
            );
        } else {
            return this.props.children;
        } 
    }
}

export default AppErrorBoundary;