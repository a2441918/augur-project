import test from 'ava';
import React from 'react';
import {shallow, mount} from 'enzyme';
import {renderJSX, JSX} from 'jsx-test-helpers';
import sinon from 'sinon';

import InputBoxContainer from '../components/reuse/InputBoxContainer/InputBoxContainer';
import {FormGroup, Input} from 'reactstrap';

function FakeComponent() {}

test('renders children when passed in', t => {
    expect(renderJSX(<InputBoxContainer />)).toMatch(
        JSX(<FakeComponent />)
    );
});

test('renders component when prop is passed', t => {

    const names=['test1', 'test2'];
    const wrapper = mount(
        <InputBoxContainer name={names}/>
    );
    expect(wrapper.find(FormGroup)).to.have.lengthOf(2);

});

test('does not renders component when prop is passed', t => {

    const wrapper = mount(
        <InputBoxContainer />
    );
    expect(wrapper.find(FormGroup)).not.toBePresent();

});