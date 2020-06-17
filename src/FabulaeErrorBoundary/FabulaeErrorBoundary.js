import React, { Component } from 'react';

class FabulaeErrorBoundary extends Component {

    state ={
        hasError: false,
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="FabulaeErrorBoundary__error">
                    <h2>Error</h2>
                    <p>Sorry, but something has gone wrong and we could not load any Fabulae at this time.</p>
                    <p>Check your connection and try again.</p>
                </div>
            );
        } else {
            return this.props.children;
        }
    }
}

export default FabulaeErrorBoundary;