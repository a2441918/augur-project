import {combineReducers} from 'redux';
import changeTokenInputValueReducer from './ChangeTokenInputReducer';
import changeAccountInputValueReducer from './ChangeAccountInputReducer';
import changeTabValueReducer from './ChangeTabValueReducer';

export default combineReducers({
	changeTokenInputValueReducer: changeTokenInputValueReducer,
	changeAccountInputValueReducer: changeAccountInputValueReducer,
	changeTabValueReducer: changeTabValueReducer
});