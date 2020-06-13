import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Fabula from './Fabula';

describe('Fabula component', () => {
    it('renders the component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Fabula />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('render the UI as expected', () => {
        const wrapper = shallow(<Fabula />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});