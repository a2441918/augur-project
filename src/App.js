import React, {Component} from 'react';
import './App.scss';

/**
 * Importing child components
 */
import Tabs from './components/Tabs/Tabs';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

class App extends Component {
    render() {
        return (
            <div className="App">
                <ErrorBoundary>
                    <Tabs/>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;
