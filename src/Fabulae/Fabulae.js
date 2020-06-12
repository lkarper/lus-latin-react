import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import STORE from '../STORE';

class Fabulae extends Component {
    render() {
        const contentPreview = Object.keys(STORE).map(fab => {
            const story = STORE[fab];
            return (
                <article key={fab}>
                    <h3><Link>{story.title}</Link></h3> {/*Set up link with router so that the story loads*/}
                    <p>{`${story.content[0]}...`}</p>
                </article>
            )
        })
        return (
            <main>
                <h2>Fabulae Latinae</h2>
                <section>
                    {contentPreview}
                </section>
            </main>
        );
    }
}

export default Fabulae;