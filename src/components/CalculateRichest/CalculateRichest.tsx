import React, {Component} from 'react';
import {InputGroup, Button, Input, Spinner} from 'reactstrap';
import axios from 'axios';

/**
 * Import Children
 */
import InputBoxContainer from '../reuse/InputBoxContainer/InputBoxContainer';

interface CalculateMostRichestState {
    showSpinner: boolean,
    data: string,
    value: string,
    error: boolean
}

class CalculateRichest extends Component<any, CalculateMostRichestState> {

    constructor(props: any) {
        super(props);
        this.state = {
            data: '',
            value: '',
            showSpinner: false,
            error: false
        };
    }

    callAPI = (token: string) => {
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


    handleSubmit = (value: string) => {
        this.setState({
            value: value
        });
        this.callAPI(value);
    };

    resetValue = (value: string) => {
        if (!value) {
            this.setState({
                data: '',
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
                    placeholder={'Enter a token value to calculate the richest'}
                    getInputValue={this.handleSubmit}
                    resetValue={this.resetValue}
                />
                {this.state.showSpinner && <Spinner color="primary"/>}
                {this.state.data !== '' && !this.state.error &&
                <div>
                    <h5>The richest value for the supplied token <code>{this.state.value}</code> is </h5>
                    <h4>{this.state.data}</h4>
                </div>}
                {this.state.error && <h4>Invalid token</h4>}
            </div>);
    }
}

export default CalculateRichest;