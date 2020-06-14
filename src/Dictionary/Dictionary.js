import React, { Component } from 'react';
import DictionaryForm from '../DictionaryForm/DictionaryForm';
import DictionaryResult from '../DictionaryResult/DictionaryResult';
import ENV from '../config';

class Dictionary extends Component {

    state = {
        wordsData: {},
        exact: false,
    }

    onSearch = (word, exact) => {
        const url = `http://localhost:8000/dictionary?word=${word}&exact=${exact}`;
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
            });
    }

    componentDidMount() {
        const { word = "", exact = "" } = this.props.match.params;
        if (word && exact) {
            this.onSearch(word, true);
        } else if (word) {
            this.onSearch(word, false);
        }
    }

    render() {
        return (
            <main>
                <DictionaryForm onSearch={this.onSearch}/>
                <DictionaryResult data={this.state.wordsData} exact={this.state.exact} />
            </main>
        );
    }
}

export default Dictionary;