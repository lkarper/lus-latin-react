import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ENV from '../config';

class FabulaeList extends Component {

    static defaultProps = {
        match: {
            params: {
                genre: '',
            }
        }
    }

    state = {
        fabulae: [],
    }

    fetchFabulae = (genre) => {
        const url = `http://localhost:8000/fabulae?genre=${genre}`;
        const options = { 
            headers: new Headers({
                "Authorization": `Bearer ${ENV.API_TOKEN || '6f06a6cd-90ea-4e28-ab97-9e02ba042203'}`,
            }),
        };
        console.log(url, options);
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    fabulae: data,
                });
                console.log(data);
            });
    }

    componentDidMount() {
        const { genre } = this.props.match.params;
        this.fetchFabulae(genre);
    }

    componentWillReceiveProps(nextProps) {
        const { genre } = nextProps.match.params;
        this.fetchFabulae(genre);
    }

    render() {
        const genre = this.props.match.params.genre;
        let contentPreview;

        if (this.state.fabulae.length) {
            contentPreview = this.state.fabulae.map(fab => {
                const id = Object.keys(fab)[0];
                const title = fab[id].title;
                const preview = fab[id].preview;
                return (
                    <li key={id}>
                        <h3>
                            <Link 
                                to={`/fabulae/${genre}/${id}`}        
                            >
                                {title}
                            </Link></h3> 
                        <p>{preview}</p>
                    </li>
                )
            });
        } else {
            contentPreview = <p className="FabulaeList__loading">Loading...</p>
        }
        return (
            <main>
                <h2>{`Fabulae ${genre.replace(genre.charAt(0), genre.charAt(0).toUpperCase())}`}</h2>
                <ul>
                    {contentPreview}
                </ul>
            </main>
        );
    }
}

FabulaeList.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            genre: PropTypes.string,
        }),
    }),
}

export default FabulaeList;