import React, {Component, Fragment} from 'react';
import {Spinner} from 'reactstrap';
import axios from 'axios';
import {connect} from 'react-redux';

/**
 * Import Children
 */
import InputBoxContainer from '../reuse/InputBoxContainer/InputBoxContainer';
import ButtonContainer from '../reuse/ButtonContainer/ButtonContainer';

interface CalculateMostRichestState {
	showSpinner: boolean,
	data: string,
	value: string,
	error: boolean,
	isInvalid: boolean
}

class CalculateRichest extends Component<any, CalculateMostRichestState> {

	constructor(props: any) {
		super(props);
		this.state = {
			data: '',
			value: '',
			showSpinner: false,
			error: false,
			isInvalid: false
		};
	}

	callAPI = (token: string) => {
		this.setState({showSpinner: true});
		axios.get(`http://localhost:8080/${token}/stats/richest`, {responseType: 'json'})
			.then((res) => {
				this.setState({
					data: res.data,
					showSpinner: false,
					error: false
				});
			}).catch((error) => {
			if (error.response.data.hasOwnProperty('error')) {
				this.setState({
					error: true,
					showSpinner: false
				});
			}
		});
	};

	handleSubmit = (value: string) => {
		if (value) {
			this.setState({
				value: value
			});
			this.callAPI(value);
		}
	};

	resetInputValue = () => {
		this.setState({value: '', data: ''})
	};

	render() {
		return (
			<div>
				<InputBoxContainer
					id={this.props.id}
					name={['token']}
					placeholder={'richest'}
				/>
				<ButtonContainer name={['token']}
								 getInputValue={this.handleSubmit}
								 id={this.props.id}
								 reset={this.resetInputValue}
				/>
				{this.state.showSpinner && <Spinner color="primary"/>}
				{this.state.data !== '' && !this.state.error && this.state.value &&
                <Fragment>
                    <h5>The richest value for the supplied token <code>{this.state.value}</code> is </h5>
                    <h4>{this.state.data}</h4>
                </Fragment>}
				{this.state.error && <h4>Invalid token</h4>}
			</div>);
	}
}

const mapStateToProps = (state: any) => {
	return {
		inputId: state.changeTokenInputValueReducer.id,
		value: state.changeTokenInputValueReducer.value
	};
};

export default connect(mapStateToProps, null)(CalculateRichest);