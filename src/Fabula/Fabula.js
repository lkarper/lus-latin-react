import React, { Component } from 'react';
import WordsList from '../WordsList/WordsList';
import STORE from '../STORE';


class Fabula extends Component {

    state ={
        currentWord: {},
    }

    setCurrentWord = (e, place) => {
        e.preventDefault();
        const {genre, id } = this.props.match.params;
        const story = STORE[genre][id];
        const currentWord = story.vocab[place];
        this.setState({
            currentWord: { [currentWord.word]: currentWord.def },
        });
    }

    render() {
        const {genre, id } = this.props.match.params;
        const story = STORE[genre][id];
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
            <div className="Fabula__container">
                <article>
                    <h3>{story.title}</h3>
                    <ol>
                        {storyLines}
                    </ol>
                </article>
                <WordsList currentWord={this.state.currentWord}/>
            </div>
        );
    }
}

export default Fabula;