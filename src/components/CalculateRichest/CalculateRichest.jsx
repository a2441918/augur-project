import React, {Component} from 'react';
import {InputGroup, Button, Input, Spinner} from 'reactstrap';
import axios from 'axios';

/**
 * Import Children
 */
import InputBox from '../reuse/InputBox/InputBox';

class CalculateRichest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: 0,
            value: '',
            showSpinner: false
        };
    }

    callAPI = (token) => {
        this.setState({showSpinner: true});
        axios.get(`http://localhost:8080/${token}/stats/richest`)
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
                <InputBox
                    placeholder={'Enter a token value to calculate the richest'}
                    getInputValue={this.handleSubmit}
                    resetValue={this.resetValue}
                />
                {this.state.showSpinner && <Spinner color="primary"/>}
                {this.state.data !== 0 && !this.state.error &&
                <div>
                    <h5>The richest value for the supplied token <code>{this.state.value}</code> is </h5>
                    <h4>{this.state.data}</h4>
                </div>}
                {this.state.error && <h4>Invalid token</h4>}
            </div>);
    }
}

export default CalculateRichest;