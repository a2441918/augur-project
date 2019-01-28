import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import App from '../App';

test('has a .App class name', t => {
    const wrapper = shallow(<App/>);
    t.true(wrapper.hasClass('App'));
});

test('renders children when passed in', t => {
    const wrapper = shallow(
        <App>
            <div className="unique"/>
        </App>
    );
    t.true(wrapper.contains(<div className="unique"/>));
});