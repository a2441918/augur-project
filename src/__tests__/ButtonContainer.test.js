import test from 'ava';
import React from 'react';
import {shallow, mount} from 'enzyme';
import {renderJSX, JSX} from 'jsx-test-helpers';

import ButtonContainer from '../components/reuse/ButtonContainer/ButtonContainer';

function FakeComponent() {}

test('renders children when passed in', () => {
    expect(renderJSX(<ButtonContainer />)).toMatch(
        JSX(<FakeComponent />)
    );
});

test('renders component when prop is passed', () => {

    const wrapper = mount(
        <ButtonContainer id={1}/>
    );
    expect(wrapper.props().id).to.equal(1);

});