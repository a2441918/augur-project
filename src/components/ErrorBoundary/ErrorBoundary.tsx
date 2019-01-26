import React, {Component} from 'react';


interface ErrorBoundaryState {
    hasError: boolean,
    error: any,
    info: any
}

class ErrorBoundary extends Component<any, ErrorBoundaryState> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            info: null
        };
    }

    componentDidCatch(error: any, info: any) {
        this.setState({
            hasError: true,
            error: error,
            info: info
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Oops, something went wrong :(</h1>
                    <p>The error: {this.state.error.toString()}</p>
                    <p>Where it occurred: {this.state.info.componentStack}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;