import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import {tabNames} from '../../constants/tabNames';

/**
 * Import Children components
 */
import CalculateMedian from '../CalculateMedian/CalculateMedian';
import CalculateAverage from '../CalculateAverage/CalculateAverage';
import CalculateRichest from '../CalculateRichest/CalculateRichest';
import CalculateMostActive from '../CalculateMostActive/CalculateMostActive';

interface TabsState {
    activeTab: string
}

class Tabs extends Component<any, TabsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeTab: '1'
        };
    }

    toggle = (tab: string) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    renderComponent = (name: string) => {

        switch (name) {
            case 'Calculate Median':
                return <CalculateMedian/>;
            case 'Calculate Average':
                return <CalculateAverage/>;
            case 'Calculate Richest':
                return <CalculateRichest/>;
            case 'Calculate Most Active':
                return <CalculateMostActive/>;
            default:
                return <div>Hi</div>;
        }
    };

    render() {
        return (
            <div>
                <Nav tabs>
                    {tabNames.map((item, index) => {
                        return (
                            <NavItem key={index}>
                                <NavLink
                                    className={classnames({active: this.state.activeTab === (index + 1).toString()})}
                                    onClick={() => this.toggle((index + 1).toString())}>
                                    {item}
                                </NavLink>
                            </NavItem>
                        );
                    })
                    }
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    {tabNames.map((item, index) => {
                        const tabName = item.replace(/(\B)[^ ]*/g, match => (match.toLowerCase()))
                            .replace(/^[^ ]/g, match => (match.toUpperCase()));

                        return (
                            <TabPane tabId={(index + 1).toString()}
                                     key={index}>
                                <Row className={'tabRow'}>
                                    <Col sm="12" className={'tabContent'}>
                                        <h4>{tabName}</h4>
                                        {this.renderComponent(tabName)}
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

export default Tabs;