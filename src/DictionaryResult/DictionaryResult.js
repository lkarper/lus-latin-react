import React from 'react';
import PropTypes from 'prop-types';

const DictionaryResult = (props) => {
    const { data, exact } = props;
    
    let resultsHTML;

    if (!Object.keys(data).length) {
        resultsHTML = <p>Enter a word above to search the dictionary.</p>;
    } else {
        if (!data.match) {
            resultsHTML = <p>Sorry, no results found.  Please check your input and try again.</p>;
        } else {
            resultsHTML = (
                <>
                    {exact ? <h2>Exact Search Results</h2> :  <h2>Search Results:</h2>}
                    <ol> 
                        {data.results.map(entry => {
                            const { declension, gender, key, main_notes, part_of_speech, senses, title_genitive, title_orthography } = entry;
                            return (
                                <li key={key}>
                                    <h3>{key}</h3>
                                    <p>Genitive ending: {title_genitive}</p>
                                    <p>Pronunciation guide: {title_orthography}</p>
                                    <p>Gender: {gender}</p>
                                    <p>Part of Speech: {part_of_speech}</p>
                                    <p>Declension: {declension}</p>
                                    <p>Notes: {main_notes}</p>
                                    <h4>Definitions</h4>
                                    <ul>{senses.map((sense, i) => <li key={i}>{sense}</li>)}</ul>
                                </li>
                            ); 
                        })}
                    </ol>
                </>
            );
        }
    }

    return (
        <div>
            {resultsHTML}
        </div>
    );
}

DictionaryResult.defaultProps = {
    data: {},
    exact: false,
}

DictionaryResult.propTypes = {
    data: PropTypes.object,
    exact: PropTypes.bool,
}

export default DictionaryResult;