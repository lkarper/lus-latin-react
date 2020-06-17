import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Blog from '../Blog/Blog';
import Fabulae from '../Fabulae/Fabulae';
import AP from '../AP/AP';
import './Main.css';
import Dictionary from '../Dictionary/Dictionary';
import PageNotFound from '../PageNotFound/PageNotFound';

class Main extends Component {
    render() {
        return (
            <div className="Main__container">
                <Switch>
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
                        exact path={["/dictionary", "/dictionary/:word"]}
                        component={Dictionary}
                    />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        );
    }
}

export default Main;