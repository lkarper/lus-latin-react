import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ENV from '../config';
import FabulaeListRender from '../FabulaeListRender/FabulaeListRender';

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
        invalidURL: false,
        badFetch: false,
    }

    validateURL = (genre) => {
        if (!genre || (genre !== 'latinae' && genre !== 'romanae')) {
            this.setState({
                invalidURL: true,
            });
        } else {
            this.setState({
                invalidURL: false,
            }, () => this.fetchFabulae(genre));
        }
    }

    fetchFabulae = (genre) => {
        const url = `https://lus-latin-server.herokuapp.com/fabulae/${genre}`;
        const options = { 
            headers: new Headers({
                "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN || '6f06a6cd-90ea-4e28-ab97-9e02ba042203'}`,
            }),
        };
        console.log(url, options);
        fetch(url, options)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error (res.statusText);
            })
            .then(data => {
                this.setState({
                    fabulae: data,
                    badFetch: false,
                });
                console.log(data);
            })
            .catch(error => {
                console.log("error", error);
                this.setState({
                    badFetch: true,
                });
            });
    }

    componentDidMount() {
        const { genre } = this.props.match.params;
        this.validateURL(genre);
    }

    componentDidUpdate(prevProps) {
        const { genre } = this.props.match.params;
        if (prevProps.match.params.genre !== genre) {
            this.validateURL(genre);
        }
    }

    render() {
        return (
            <FabulaeListRender 
                genre={this.props.match.params.genre}
                fabulae={this.state.fabulae}
                badFetch={this.state.badFetch}
                invalidURL={this.state.invalidURL}
            />
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