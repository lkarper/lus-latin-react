import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../Home/Home';
import Blog from '../Blog/Blog';
import Fabulae from '../Fabulae/Fabulae';
import AP from '../AP/AP';
import './Main.css';
import Dictionary from '../Dictionary/Dictionary';

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
                <Route 
                    exact path={["/dictionary", "/dictionary/:word/:exact", "/dictionary/:word"]}
                    component={Dictionary}
                />
            </div>
        );
    }
}

export default Main;