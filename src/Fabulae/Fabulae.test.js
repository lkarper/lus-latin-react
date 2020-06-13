import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Fabulae from './Fabulae';

describe('Fabulae component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Fabulae />
            </BrowserRouter>, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = shallow(<BrowserRouter><Fabulae /></BrowserRouter>);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});