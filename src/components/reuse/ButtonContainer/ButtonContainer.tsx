import React, {Component, Fragment} from 'react';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

/**
 * Import actions
 */
import {resetInputValue} from '../../../actions/actions';

interface ButtonContainerProps {
	resetInputValue: any,
	getInputValue: any,
	token: string,
	account: string,
	isInvalid: boolean,
	id: number
}

class ButtonContainer extends Component<ButtonContainerProps, any> {

	constructor(props: any) {
		super(props);

	}

	handleReset = () => {
		console.log('called')
		this.props.resetInputValue();
	};

	handleSubmit = () => {
		this.props.getInputValue(this.props.token, this.props.account);
	};

	render() {
		return (
			<Fragment>
				<Button color="warning" disabled={this.props.token === ''}
						onClick={this.handleReset}>
					Reset
				</Button>
				<Button color="success" disabled={this.props.token === '' || this.props.isInvalid}
						onClick={this.handleSubmit}>
					Submit
				</Button>
			</Fragment>
		);
	}

}

const mapStateToProps = (state: any, ownProps: any) => {
	return {
		isInvalid: state.changeTokenInputValueReducer.isInvalid,
		token: state.changeTokenInputValueReducer.token,
		account: state.changeAccountInputValueReducer.account,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators(
		{
			resetInputValue: resetInputValue
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonContainer);