import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class DictionaryForm extends Component {

    static defaultProps = {
        match: {
            params: {
                word: '',
            }
        },
        onSearch: () => {},
        history: {
            push: () => {},
        },
    }

    state = {
        word: '',
    }

    search = (e, exact) => {
        e.preventDefault();
        this.props.onSearch(this.state.word, exact);
        this.props.history.push(`/dictionary/${this.state.word}?exact=${exact}`);
    }

    componentDidMount() {
        const { word = "" } = this.props.match.params;
        if (word) {
            this.setState({ word });
        }
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
                    value={this.state.word}
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

DictionaryForm.propTypes = {
    onSearch: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            word: PropTypes.string,
        }),
    }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }),
}

export default withRouter(DictionaryForm);