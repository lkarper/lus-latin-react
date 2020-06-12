import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../Home/Home';
import Blog from '../Blog/Blog';
import Fabulae from '../Fabulae/Fabulae';
import AP from '../AP/AP';

class Main extends Component {
    render() {
        return (
            <div className="Main__container">
                <Route 
                    exact path="/"
                    component={Home}
                />
                <Route 
                    path="/blog"
                    component={Blog}
                />
                <Route 
                    path="/fabulae/:genre"
                    component={Fabulae}
                />
                <Route 
                    path="/ap"
                    component={AP}
                />
            </div>
        );
    }
}

export default Main;