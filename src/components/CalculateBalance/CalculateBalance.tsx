import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import InputBoxContainer from '../reuse/InputBoxContainer/InputBoxContainer';
import ButtonContainer from '../reuse/ButtonContainer/ButtonContainer';
import {Spinner} from 'reactstrap';

interface CalculateBalanceState {
	showSpinner: boolean,
	data: string,
	token: string,
	account: string,
	error: boolean,
	isInvalid: boolean
}

class CalculateBalance extends Component<any, CalculateBalanceState> {

	constructor(props: any) {
		super(props);
		this.state = {
			data: '',
			token: '',
			account: '',
			showSpinner: false,
			error: false,
			isInvalid: false
		};
	}

	callAPI = (token: string, account: string) => {
		this.setState({showSpinner: true});
		axios.get(`http://localhost:8080/${token}/account/${account}/balance`, {responseType: 'json'})
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

	handleSubmit = (token: string, account: string) => {
		if (token) {
			this.setState({
				token: token,
				account: account
			});
			this.callAPI(token, account);
		}
	};


	render() {
		return (
			<div>
				<InputBoxContainer
					id={1}
					name={['token', 'account']}
					placeholder={'Enter a token value to calculate the balance'}
				/>
				<ButtonContainer name={['token', 'account']}
								 getInputValue={this.handleSubmit}
								 id={this.props.id}/>
				{this.state.showSpinner && <Spinner color="primary"/>}
				{this.state.data !== '' && !this.state.error && this.state.token &&
                <Fragment>
                    <h5>The balance for the supplied token <code>{this.state.token}</code> and account <code>{this.state.account}</code> is </h5>
                    <h4>{this.state.data}</h4>
                </Fragment>}
				{this.state.error && <h4>Invalid token</h4>}
			</div>);
	}
}

export default CalculateBalance;