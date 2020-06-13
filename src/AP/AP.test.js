import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AP from './AP';

describe('AP component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AP />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('renders the UI as expected', () => {
        const wrapper = shallow(<AP/>);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});