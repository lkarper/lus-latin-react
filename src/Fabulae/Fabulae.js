import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import FabulaeList from '../FabulaeList/FabulaeList';
import Fabula from '../Fabula/Fabula';
import FabulaeErrorBoundary from '../FabulaeErrorBoundary/FabulaeErrorBoundary';

class Fabulae extends Component {
    render() {
        return (
            <main>
                <FabulaeErrorBoundary>
                    <Route 
                        exact path="/fabulae/:genre"
                        component={FabulaeList}
                    />
                    <Route 
                        exact path="/fabulae/:genre/:id"
                        component={Fabula}
                    />
                </FabulaeErrorBoundary>
            </main>
        );
    }
}

export default Fabulae;