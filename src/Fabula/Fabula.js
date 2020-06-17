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
        invalidURL: false,
        fileNotFound: false,
    }

    setCurrentWord = (e, place) => {
        e.preventDefault();
        const { story } = this.state;
        const currentWord = story.vocab[place];
        this.setState({
            currentWord: { [currentWord.word]: currentWord.def },
        });
    }

    validateURL = (genre, id) => {
        if (!genre || (genre !== 'latinae' && genre !== 'romanae')) {
            this.setState({
                invalidURL: true,
            });
        } else {
            this.setState({
                invalidURL: false,
            }, () => this.fetchFabula(genre, id));
        }
    }

    fetchFabula = (genre, id) => {
        const url = `http://localhost:8000/fabulae/${genre}/${id}`;
        const options = { 
            headers: new Headers({
                "Authorization": `Bearer ${ENV.API_TOKEN || '6f06a6cd-90ea-4e28-ab97-9e02ba042203'}`,
            }),
        };
        fetch(url, options)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                if (res.status === 404) {
                    this.setState({ fileNotFound: true });
                }
                throw new Error (res.statusText);
            })
            .then(data => {
                this.setState({
                    story: data,
                });
                console.log(data);
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    componentDidMount() {
        const { genre, id } = this.props.match.params;
        this.validateURL(genre, id);
    }

    componentDidUpdate(prevProps) {
        const { genre, id } = this.props.match.params;
        if (prevProps.match.params.genre !== genre || prevProps.match.params.id !== id) {
            this.validateURL(genre, id);
        }
    }

    render() {
        const { story } = this.state;
        if (this.state.invalidURL) {
            return (
                <>
                <h2>Error</h2>
                <p>File not found.  Check the address and try again.</p>
                </>
            );
        } else if (this.state.fileNotFound) {
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