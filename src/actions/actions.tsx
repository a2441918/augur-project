import {actionTypes} from "./actionTypes";

export const changeTokenInputValue = (value: string, item: string) => ({
    type: actionTypes.CHANGE_TOKEN_INPUT_VALUE,
    value,
	item
});

export const changeAccountInputValue = (value: string, item: string) => ({
	type: actionTypes.CHANGE_ACCOUNT_INPUT_VALUE,
	value,
	item
});

export const resetInputValue = (value: boolean) => ({
	type: actionTypes.RESET_INPUT_VALUE,
	value
});

export const getTabValue = (value: number) => ({
	type: actionTypes.GET_TAB_VALUE,
	value
});
