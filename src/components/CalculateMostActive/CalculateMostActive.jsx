import React, {Component} from 'react';
import {Spinner} from 'reactstrap';
import axios from 'axios';

/**
 * Import Children
 */
import InputBoxContainer from '../reuse/InputBoxContainer/InputBoxContainer';

class CalculateMostActive extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: 0,
            value: '',
            showSpinner: false,
            error: false
        };
    }

    callAPI = (token) => {
        this.setState({showSpinner: true});
        axios.get(`http://localhost:8080/${token}/stats/mostActive`)
            .then((res) => {
                this.setState({
                    data: res.data,
                    showSpinner: false,
                    error: false
                });
            }).catch((error) => {
            if (error.response.data.error === 'no such token') {
                this.setState({
                    error: true,
                    showSpinner: false
                });
            }
        });
    };

    handleSubmit = (value) => {
        this.setState({
            value: value
        });
        this.callAPI(value);
    };

    resetValue = (value) => {
        if (!value) {
            this.setState({
                data: 0,
                showSpinner: false,
                value: '',
                error: false
            });
        }
    };

    render() {
        return (
            <div>
                <InputBoxContainer
                    placeholder={'Enter a token value to calculate the most active token'}
                    getInputValue={this.handleSubmit}
                    resetValue={this.resetValue}
                />
                {this.state.showSpinner && <Spinner color="primary"/>}
                {this.state.data !== 0 && !this.state.error &&
                <div>
                    <h5>The most active account for <code>{this.state.value}</code> is </h5>
                    <h4>{this.state.data}</h4>
                </div>}
                {this.state.error && <h4>Invalid token</h4>}
            </div>);
    }
}

export default CalculateMostActive;