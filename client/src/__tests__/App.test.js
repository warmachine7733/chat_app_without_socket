/**
 * @jest-environment node
 */
import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

test('testing1', () => {
    console.log('hi');
    const wrapper  = shallow(<App/>)
    console.log(wrapper.debug());
})