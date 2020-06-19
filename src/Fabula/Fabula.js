import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FabulaRender from '../FabulaRender/FabulaRender';
import WordsList from '../WordsList/WordsList';
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

    setCurrentWord = (place) => {
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
        const url = `https://lus-latin-server.herokuapp.com/fabulae/${genre}/${id}`;
        console.log(process.env.REACT_APP_API_TOKEN);
        const options = { 
            headers: new Headers({
                "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN || '6f06a6cd-90ea-4e28-ab97-9e02ba042203'}`,
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
                    fileNotFound: false,
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
        return (
            <>
                <FabulaRender data={{...this.state}} setCurrentWord={this.setCurrentWord} />
                <WordsList currentWord={this.state.currentWord}/>
            </>
        );
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