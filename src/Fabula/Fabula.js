import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WordsList from '../WordsList/WordsList';
import ENV from '../config';
import './Fabula.css';

class Fabula extends Component {

    static defaultProps = {
        match: {
            params: {
                genre: '',
                id: '',
            },
        },
    }

    state = {
        story: {},
        currentWord: {},
    }

    setCurrentWord = (e, place) => {
        e.preventDefault();
        const { story } = this.state;
        const currentWord = story.vocab[place];
        this.setState({
            currentWord: { [currentWord.word]: currentWord.def },
        });
    }

    componentDidMount() {
        const { genre, id } = this.props.match.params;
        const url = `http://localhost:8000/fabulae?genre=${genre}&id=${id}`;
        const options = { 
            headers: new Headers({
                "Authorization": `Bearer ${ENV.API_TOKEN || '6f06a6cd-90ea-4e28-ab97-9e02ba042203'}`,
            }),
        };
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    story: data,
                });
                console.log(data);
            });
    }

    render() {
        const { story } = this.state;
        if (Object.keys(story).length) {
            const storyLines = story.content.map((line, index) => {
                const wordButtons = line
                    .split(' ')
                    .map((word, i) => {
                        if (Object.keys(story.vocab).includes(`line:${index + 1}_word:${i + 1}`)) {  
                            return (
                                <button 
                                    key={i} 
                                    onClick={(e)=> this.setCurrentWord(e, `line:${index + 1}_word:${i + 1}`)}
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
                <>
                    <article className="Fabula__container">
                        <h3>{story.title}</h3>
                        <ol>
                            {storyLines}
                        </ol>
                    </article>
                    <WordsList currentWord={this.state.currentWord}/>
                </>
            );
        } else {
            return <p className="Fabula__loading">Loading...</p>;
        }
    }
}

Fabula.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            genre: PropTypes.string,
            id: PropTypes.string,
        }),
    }),
}

export default Fabula;