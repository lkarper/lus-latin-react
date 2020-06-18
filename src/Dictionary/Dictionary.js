import React, { Component } from 'react';
import DictionaryForm from '../DictionaryForm/DictionaryForm';
import DictionaryResult from '../DictionaryResult/DictionaryResult';
import PropTypes from 'prop-types';
import ENV from '../config';

class Dictionary extends Component {

    static defaultProps = {
        match: {
            params: {
                word: '',
            }
        },
        location: {
            search: '',
        }
    }

    state = {
        wordsData: {},
        exact: false,
        badQuery: false,
    }

    onSearch = (word, exact) => {
        const url = `http://localhost:8000/dictionary/${word}?exact=${exact}`;
        const options = { 
            headers: new Headers({
                "Authorization": `Bearer ${ENV.API_TOKEN || '6f06a6cd-90ea-4e28-ab97-9e02ba042203'}`,
            }),
        };
        fetch(url, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error (response.statusText);
            })
            .then(wordsData => {
                console.log(wordsData);
                this.setState({wordsData, exact});
            })
            .catch(error => {
                console.log(error);
                // TODO: update state for a bad fetch
            });
    }

    validateURL = (search) => {
        if ((search && search !== "?exact=true" && search !== "?exact=false") || (search && !this.props.match.params.word)) {
            this.setState({
                badQuery: true,
            });
        } else {
            this.setState({
                badQuery: false,
            }, () => {
                const { word = "" } = this.props.match.params;
                if (word && !this.state.badQuery) {
                    const exact = this.props.location.search.split('=')[1] || "false";
                    this.onSearch(word, exact);
                }
            });
        }
    }

    componentDidMount() {
        const { search } = this.props.location;
        this.validateURL(search);
    }

    componentDidUpdate(prevProps) {
        const { search } = this.props.location;
        if (prevProps.location.search !== search) {
            if (search !== '') {
                this.validateURL(search);
            } else {
                this.setState({
                    wordsData: {},
                });
            }
        }
    }

    render() {
        return (
            <main>
                {this.state.badQuery ?
                    <>
                        <h2>Page not found</h2>
                        <p>Invalid address.  Check the address and try again.</p>
                    </>
                    :
                    <>
                        <DictionaryForm onSearch={this.onSearch}/>
                        <DictionaryResult data={this.state.wordsData} exact={this.state.exact} />
                    </>
                }
            </main>
        );
    }
}

Dictionary.propTypes ={
    match: PropTypes.object.isRequired,
    location: PropTypes.shape({
        search: PropTypes.oneOf(['', '?exact=true', '?exact=false']),
    }),
}

export default Dictionary;
