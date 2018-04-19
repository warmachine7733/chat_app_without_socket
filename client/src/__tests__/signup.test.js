/**
 * @jest-environment node
 */
import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../signup';


Enzyme.configure({ adapter: new Adapter });

test('signup component test-1', () => {
    const wrapper = shallow(<Home />)

    wrapper.find('.button').simulate('click')
    
    var x = true;
    if (true) {
        console.log(wrapper.setState({ name: 'hi' }));
        console.log(wrapper.find('#name').debug());
    }
})