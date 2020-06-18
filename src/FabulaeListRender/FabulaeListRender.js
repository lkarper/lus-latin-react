import React from 'react';
import { Link } from 'react-router-dom';

const FabulaeListRender = (props) => {
    const { genre, fabulae, badFetch, invalidURL } = props;
    let contentPreview;

    if (fabulae.length) {
        contentPreview = fabulae.map(fab => {
            const id = Object.keys(fab)[0];
            const title = fab[id].title;
            const preview = fab[id].preview;
            return (
                <li key={id}>
                    <h3>
                        <Link 
                            to={`/fabulae/${genre}/${id}`}        
                        >
                            {title}
                        </Link></h3> 
                    <p>{preview}</p>
                </li>
            )
        });
    } else {
        contentPreview = <p className="FabulaeList__loading">Loading...</p>
    }

    let errorHTML;

    if (invalidURL) {
        errorHTML = (
            <>
                <h2>File not found</h2>
                <p>Check the address and try agian.</p>
            </>
        );
    } else if (badFetch) {
        errorHTML = (
            <>
                <h2>Error</h2>
                <p>Looks like something went wrong and we could not load the stories at this time.</p>
            </>
        );
    }
    return (
        <main>
            {errorHTML ? errorHTML :
                <>
                    <h2>{`Fabulae ${genre.replace(genre.charAt(0), genre.charAt(0).toUpperCase())}`}</h2>
                    <ul>
                        {contentPreview}
                    </ul>
                </>
            }
        </main>
    );
}


export default FabulaeListRender;