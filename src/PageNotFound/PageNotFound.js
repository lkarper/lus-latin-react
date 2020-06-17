import React from 'react';

const PageNotFound = (props) => {
    return (
        <main>
            <h2>Page Not Found</h2>
            <p>Sorry, but we couldn't find the page at path: {`"${props.location.pathname}${props.location.search}"`}</p>
            <button onClick={() => props.history.push('/')}>Back to home</button>
        </main>
    );
}

export default PageNotFound;