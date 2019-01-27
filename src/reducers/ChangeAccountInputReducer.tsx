import {actionTypes} from '../actions/actionTypes';

const initialState = {
	account: '',
	isInvalid: false
};

const validPattern = /^[0-9a-zA-Z]+$/;

const changeAccountInputValueReducer = (state = initialState, action: any) => {

	switch (action.type) {
		case actionTypes.CHANGE_ACCOUNT_INPUT_VALUE: {
			return {
				...state,
				account: action.value,
				isInvalid: !action.value.match(validPattern)
			};
		}
		case actionTypes.RESET_INPUT_VALUE: {
			return {
				...state,
				account: initialState.account
			}
		}
		default:
			return state;
	}
};

export default changeAccountInputValueReducer;