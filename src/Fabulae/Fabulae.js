import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import FabulaeList from '../FabulaeList/FabulaeList';
import Fabula from '../Fabula/Fabula';

class Fabulae extends Component {
    render() {
        return (
            <main>
                <Route 
                    exact path="/fabulae/:genre"
                    component={FabulaeList}
                />
                <Route 
                    exact path="/fabulae/:genre/:id"
                    component={Fabula}
                />
            </main>
        );
    }
}

export default Fabulae;