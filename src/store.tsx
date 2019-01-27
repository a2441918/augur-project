import {createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import combineReducers from './reducers/combineReducers';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState = {}) {
	const store = createStore(combineReducers, initialState, composeEnhancers(applyMiddleware()));
	return store;
}