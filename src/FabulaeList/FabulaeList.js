import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import STORE from '../STORE';

class Fabulae extends Component {
    render() {
        const genre = this.props.match.params.genre;
        const stories = STORE[genre];
        const contentPreview = Object.keys(stories).map(id => {
            const story = stories[id];
            return (
                <li key={id}>
                    <h3>
                        <Link 
                            to={`/fabulae/${genre}/${id}`}        
                        >
                            {story.title}
                        </Link></h3> 
                    <p>{`${story.content[0]}...`}</p>
                </li>
            )
        });
        return (
            <main>
                <h2>Fabulae Latinae</h2>
                <ul>
                    {contentPreview}
                </ul>
            </main>
        );
    }
}

export default Fabulae;