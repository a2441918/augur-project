import test from 'ava';
import React from 'react';
import {shallow, mount} from 'enzyme';
import {renderJSX, JSX} from 'jsx-test-helpers';
import sinon from 'sinon';

import Tabs from '../components/Tabs/Tabs';

function FakeComponent() {}

test('renders children when passed in', t => {
    expect(renderJSX(<Tabs />)).toMatch(
        JSX(<FakeComponent />)
    );
});

test('change tabs when tab is clicked', t => {
    const onToggle = sinon.spy();
    const wrapper = mount(
        <Tabs />
    );
    wrapper.find('.nav-link').simulate('click');
    t.true(onToggle.calledWith(1))

});