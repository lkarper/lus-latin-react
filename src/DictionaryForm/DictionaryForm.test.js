import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import DictionaryForm from './DictionaryForm';

describe('DictionaryForm component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <DictionaryForm />
            </BrowserRouter>, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
    it('renders the UI as expected', () => {
        const wrapper = shallow(
            <BrowserRouter>
                <DictionaryForm />
            </BrowserRouter>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
})