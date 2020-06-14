import React, { Component } from 'react';

class DictionaryForm extends Component {

    state = {
        word: '',
        exact: false,
    }

    search = (e, exact) => {
        e.preventDefault();
        this.setState({ exact }, () => this.props.onSearch(this.state));
    }

    render() {
        return (
        <form id="search-tools">
            <fieldset>
                <legend>Enter a Latin word to search for an English definition.</legend>
                <input 
                    type="text" 
                    name="word" 
                    id="inputBox" 
                    placeholder="ēricia" 
                    aria-label="Enter a word to search the dictionary."
                    aria-required="true"
                    required
                    onChange={e => this.setState({ word: e.target.value })}
                />
                <button 
                    id="submitButton" 
                    disabled={!this.state.word}
                    onClick={e => this.search(e, false)}
                >Search</button>
                <button 
                    id="exactMatch"
                    disabled={!this.state.word}
                    onClick={e => this.search(e, true)}
                >Find Exact Match</button>
            </fieldset>
        </form>
        );
    }
}

export default DictionaryForm;