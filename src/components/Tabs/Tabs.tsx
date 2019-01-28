import React, {Component, Suspense} from 'react';
import {Route, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {TabContent, TabPane, Nav, NavItem, Row, Col, NavbarBrand, Navbar} from 'reactstrap';
import classnames from 'classnames';
import {TAB_NAMES} from '../../constants/constants';
import logo from '../../augur-logo.svg';
import {changeTokenInputValue, changeAccountInputValue, getTabValue} from '../../actions/actions';
import history from '../../utils/utils';

/**
 * Import Children components
 */
const CalculateMedian = React.lazy(() => import('../CalculateMedian/CalculateMedian'));
const CalculateAverage = React.lazy(() => import('../CalculateAverage/CalculateAverage'));
const CalculateRichest = React.lazy(() => import('../CalculateRichest/CalculateRichest'));
const CalculateMostActive = React.lazy(() => import('../CalculateMostActive/CalculateMostActive'));
const CalculateBalance = React.lazy(() => import('../CalculateBalance/CalculateBalance'));

interface TabsState {
	activeTab: number
}

class Tabs extends Component<any, TabsState> {
	constructor(props: any) {
		super(props);
		this.state = {
			activeTab: 1
		};
	}

	toggle = (tab: number) => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
			this.props.getTabValue(tab);
		}
	};

	componentWillUpdate(nextProps: Readonly<any>, nextState: Readonly<TabsState>, nextContext: any): void {
		if(Number.isInteger(nextProps.tabId)) {
			this.props.changeTokenInputValue('')
		}
	}

	renderComponent = (name: string, index: number) => {

		switch (name) {
			case 'CalculateMedian':
				return <Route path={`/CalculateMedian`}
							  render={() =>
								  <Suspense fallback={<div>Loading...</div>}>
									  <CalculateMedian id={index}/>
								  </Suspense>}/>;
			case 'CalculateAverage':
				return <Route path={`/CalculateAverage`}
							  render={() =>
								  <Suspense fallback={<div>Loading...</div>}>
									  <CalculateAverage id={index}/>
								  </Suspense>}/>;
			case 'CalculateRichest':
				return <Route path={`/CalculateRichest`}
							  render={() =>
								  <Suspense fallback={<div>Loading...</div>}>
									  <CalculateRichest id={index}/>
								  </Suspense>}/>;
			case 'CalculateMostActive':
				return <Route path={`/CalculateMostActive`}
							  render={() =>
								  <Suspense fallback={<div>Loading...</div>}>
									  <CalculateMostActive id={index}/>
								  </Suspense>}/>;
			case 'CalculateBalance':
				return <Route path={`/CalculateBalance`}
							  render={() =>
								  <Suspense fallback={<div>Loading...</div>}>
									  <CalculateBalance id={index}/>
								  </Suspense>}/>;
			default:
				return <Route path={`/`}
							  render={() =>
								  <Suspense fallback={<div>Loading...</div>}>
									  <h1>Welcome to Augur Demo Project</h1>
									  <h2>Please click on the above tabs to get started.</h2>
								  </Suspense>}/>;
		}
	};

	render() {
		return (
			<div>
				<Navbar>
					<NavbarBrand href="/">
						<div className={'imageBackground'}>
							<img src={logo} alt="Logo"/>
						</div>
					</NavbarBrand>
					<Nav tabs>
						{TAB_NAMES.map((item, index) => {
							const tabName = item.replace(/(\B)[^ ]*/g, match => (match.toLowerCase()))
								.replace(/^[^ ]/g, match => (match.toUpperCase()));
							return (
								<NavItem key={index}>
									<NavLink
										className="nav-link"
										activeClassName={classnames({active: this.state.activeTab === (index + 1)})}
										exact to={`/${tabName.replace(/\s/g, '')}`}
										onClick={() => this.toggle((index + 1))}>
										{item}
									</NavLink>
								</NavItem>
							);
						})
						}
					</Nav>
				</Navbar>
				<TabContent activeTab={this.state.activeTab}>
					{TAB_NAMES.map((item, index) => {
						const tabName = item.replace(/(\B)[^ ]*/g, match => (match.toLowerCase()))
							.replace(/^[^ ]/g, match => (match.toUpperCase()));

						return (
							<TabPane tabId={(index + 1)}
									 key={index}>
								<Row className={'tabRow'}>
									<Col sm="12" className={'tabContent'}>
										<h4>{tabName}</h4>
										{history.location.pathname === '/' ? <Suspense fallback={<div>Loading...</div>}>
											<CalculateBalance id={index}/>
										</Suspense> : this.renderComponent(tabName.replace(/\s/g, ''), (index + 1))}
									</Col>
								</Row>
							</TabPane>
						);
					})}
				</TabContent>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		tabId: state.changeTabValueReducer.value
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators(
		{
			getTabValue: getTabValue,
			changeTokenInputValue: changeTokenInputValue,
			changeAccountInputValue: changeAccountInputValue
		},
		dispatch
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);