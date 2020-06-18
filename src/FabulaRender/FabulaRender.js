import React from 'react';

const FabulaRender = (props) => {
    const { story, invalidURL, fileNotFound } = props.data;
        if (invalidURL) {
            return (
                <>
                    <h2>Error</h2>
                    <p>Page not found.  Check the address and try again.</p>
                </>
            );
        } else if (fileNotFound) {
            return (
                <>
                    <h2>Error</h2>
                    <p>Story not found. Check the address and try again.</p>
                </>
            )
        } else if (Object.keys(story).length) {
            const storyLines = story.content.map((line, index) => {
                const wordButtons = line
                    .split(' ')
                    .map((word, i) => {
                        if (Object.keys(story.vocab).includes(`line:${index + 1}_word:${i + 1}`)) {  
                            return (
                                <button 
                                    key={i} 
                                    onClick={(e)=> props.setCurrentWord(`line:${index + 1}_word:${i + 1}`)}
                                >
                                    {word}
                                </button>
                            );
                        }
                        return <span key={i}>{` ${word} `}</span>;
                    }); 
                return (
                    <li key={index}>
                        <p>{wordButtons}</p>
                    </li>);
                });
            return (
                <article className="Fabula__container">
                    <h3>{story.title}</h3>
                    <ol>
                        {storyLines}
                    </ol>
                </article>
            );
        } else {
            return <p className="Fabula__loading">Loading...</p>
        }

}

export default FabulaRender;