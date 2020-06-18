import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import DictionaryResult from './DictionaryResult';

describe('DictionaryResult component', () => {
    it('renders the component as expected', () => {
        const div = document.createElement('div');
        ReactDOM.render(<DictionaryResult />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    
    it('renders the UI as expected when no data is passed in props', () => {
        const wrapper = shallow(<DictionaryResult />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});