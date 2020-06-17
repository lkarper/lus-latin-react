import React, { Component } from 'react';

class DictionaryErrorBoundary extends Component {
    state ={
        hasError: false,
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <h2>Something went wrong...</h2>
                    <p>Sorry, but it looks like something went wrong while loading the dictionary.  Check your connection and reload the page.</p>
                </>
            );
        } else {
            return this.props.children;
        }
    }
}

export default DictionaryErrorBoundary;