import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import combineReducers from './reducers/combineReducers';

import {composeWithDevTools} from 'redux-devtools-extension';

export default function configureStore(initialState = {}) {
	const store = createStore(combineReducers, initialState, composeWithDevTools(applyMiddleware(logger)));
	return store;
}