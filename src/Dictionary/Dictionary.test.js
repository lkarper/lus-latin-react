import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Dictionary from './Dictionary';

describe('Dictionary component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><Dictionary /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});