import React, { Component } from 'react';
import './WordsList.css';

class WordsList extends Component {

    static defaultProps = {
        currentWord: {}
    }

    state = {
        wordsList: [],
    }

    addWord = () => {
        this.setState({
            wordsList: [...this.state.wordsList, this.props.currentWord],
        })
    }

    render() {
        const currentVocab = Object.keys(this.props.currentWord)[0];
        const currentDef = this.props.currentWord[currentVocab];
        const added = this.state.wordsList.includes(this.props.currentWord);
        const currentWordHTML = (
            <>
                <h4>{currentVocab}</h4>
                <p>{currentDef}</p>
                <button 
                    type="button"
                    onClick={this.addWord}
                    disabled={added}
                >
                    Add Word to Vocab List
                </button>
                {added && <p>This words has already been added to your list!</p>}
            </>
        );
        const wordsListHTML = this.state.wordsList.map(word => {
            const vocab = Object.keys(word)[0];
            const def = word[vocab];
            return (
                <li key={word}>
                    <p>{`${vocab}: "${def}"`}</p>
                </li>
            );
        });
        return (
            <div className="WordsList__container">
                <div className="WordsList__currentWord">
                    <h3>Verbum Electum</h3>
                    {Object.keys(this.props.currentWord).length ? currentWordHTML : <p>Click on a word in the story to view its definition.</p>}
                </div>
                <div className="WordsList__list">
                    <ol className={this.state.wordsList.length ? '' : 'WordsList__emptyList'}>
                        {this.state.wordsList.length ? wordsListHTML : <li>Looks like your Words List is empty at the moment.</li>}
                    </ol>
                </div>
            </div>
        );
    }
}

export default WordsList;