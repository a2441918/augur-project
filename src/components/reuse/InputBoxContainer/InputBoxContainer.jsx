import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {InputGroup, Button, Input} from 'reactstrap';

class InputBoxContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    };

    handleReset = () => {
        this.setState({
            value: ''
        });
        this.props.resetValue('');
    };

    handleSubmit = () => {
        this.props.getInputValue(this.state.value);
    };

    render() {
        return (
            <div>
                <InputGroup>
                    <Input placeholder={this.props.placeholder}
                           type="text"
                           name="token"
                           value={this.state.value}
                           onChange={this.handleChange}
                    />
                </InputGroup>
                <div>
                    <Button color="warning" disabled={this.state.value === ''}
                            onClick={this.handleReset}>
                        Reset
                    </Button>
                    <Button color="success" disabled={this.state.value === ''}
                            onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        );
    }
}

InputBoxContainer.propTypes = {
    placeholder: PropTypes.string,
    getInputValue: PropTypes.func,
    resetValue: PropTypes.func
};

export default InputBoxContainer;