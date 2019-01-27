import {actionTypes} from '../actions/actionTypes';

const initialState = {
	value: 0,
};

const changeTabValueReducer = (state = initialState, action: any) => {

	switch (action.type) {
		case actionTypes.GET_TAB_VALUE: {
			return {
				...state,
				value: action.value
			};
		}
		default:
			return state;
	}
};

export default changeTabValueReducer;