import React, {Component} from 'react';
import {Router} from 'react-router-dom';
import './App.scss';
import history from './utils/utils';

/**
 * Importing child components
 */
import Tabs from './components/Tabs/Tabs';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import {Provider} from 'react-redux';
import configureStore from './store';

class App extends Component {
	render() {
		return (
			<Provider store={configureStore()}>
				<Router history={history}>
					<div className="App">
						<ErrorBoundary>
							<Tabs/>
						</ErrorBoundary>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
