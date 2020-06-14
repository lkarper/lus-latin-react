import React, { Component } from 'react';

class DictionaryResult extends Component {
    render() {
        const { data } = this.props;
        
        let resultsHTML;

        if (!Object.keys(data).length) {
            resultsHTML = <p>Enter a word above to search the dictionary.</p>;
        } else {
            if (!data.match) {
                resultsHTML = <p>Sorry, no results found.  Please check your input and try again.</p>;
            } else {
                resultsHTML = (
                <ol> 
                    {data.results.map(entry => {
                        const { declension, gender, key, main_notes, part_of_speech, senses, title_genitive, title_orthography } = entry;
                        return (
                            <li key={key}>
                                <h3>{key}</h3>
                                <p>{title_genitive}</p>
                                <p>{title_orthography}</p>
                                <p>{gender}</p>
                                <p>{part_of_speech}</p>
                                <p>{declension}</p>
                                <p>{main_notes}</p>
                                <ul>{senses.map((sense, i) => <li key={i}>{sense}</li>)}</ul>
                            </li>
                        ); 
                    })}
                </ol>)
            }
        }

        return (
            <div>
                {resultsHTML}
            </div>
        );
    }
}

export default DictionaryResult;