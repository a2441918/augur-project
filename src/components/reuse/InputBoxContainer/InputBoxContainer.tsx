import React, {Component} from 'react';
import {FormGroup, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

/**
 * Import Actions
 */
import {changeTokenInputValue, changeAccountInputValue, resetInputValue} from '../../../actions/actions';

interface InputBoxContainerState {
	value: string
}

class InputBoxContainer extends Component<any, InputBoxContainerState> {

	constructor(props: any) {
		super(props);
		this.state = {
			value: ''
		};
	}

	handleChange = (event: any, item: string) => {
		if (item === 'token') {
			this.props.changeTokenInputValue(event.target.value, item);
		} else {
			this.props.changeAccountInputValue(event.target.value, item);
		}
	};

	componentWillUpdate(nextProps: Readonly<any>, nextState: Readonly<InputBoxContainerState>, nextContext: any): void {
		if (!nextProps.token) {
			this.props.changeTokenInputValue('', 'token');
			this.props.changeAccountInputValue('', 'account');
		}
		if (this.props.resetValue === '') {
			this.props.resetInputValue(false);
		}
	}

	render() {
		return (
			<div>
				{this.props.name.map((item: string, index: number) => {
					return (
						<FormGroup key={index}>
							<Input placeholder={`Enter a ${item} value to calculate the ${this.props.placeholder}`}
								   type="text"
								   name={`${item}${this.props.id}`}
								   id={`token${this.props.id}`}
								   invalid={this.props.isInvalid}
								   value={this.props.resetValue ? '' : this.props.item}
								   onChange={(e) => this.handleChange(e, item)}
							/>
						</FormGroup>
					);
				})}
			</div>
		);
	}
}

const mapStateToProps = (state: any, ownProps: any) => {
	console.log(state);
	return {
		isInvalid: state.changeTokenInputValueReducer.isInvalid,
		validId: state.changeTokenInputValueReducer.id,
		tabId: state.changeTabValueReducer.value,
		resetValue: state.changeTokenInputValueReducer.resetValue,
		account: state.changeTokenInputValueReducer.account,
		token: state.changeTokenInputValueReducer.token,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators(
		{
			changeTokenInputValue: changeTokenInputValue,
			changeAccountInputValue: changeAccountInputValue,
			resetInputValue: resetInputValue
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(InputBoxContainer);