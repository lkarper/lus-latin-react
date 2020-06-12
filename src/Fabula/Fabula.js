import React, { Component } from 'react';
import STORE from '../STORE';


class Fabula extends Component {
    render() {
        const {genre, id } = this.props.match.params;
        const story = STORE[genre][id];
        const storyLines = story.content.map((line, i) => <p key={i}>{line}</p>);
        return (
            <article>
                <h3>{story.title}</h3>
                {storyLines}
            </article>
        );
    }
}

export default Fabula;