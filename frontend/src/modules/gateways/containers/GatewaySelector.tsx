import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Dropdown, IDropdownItem } from 'modules/core';
import { connect } from 'react-redux';
import { GatewaysActions, GatewaysState, GatewaysActionsType } from 'modules/gateways';
import { bindActionCreators } from 'redux';


interface GatewaySelectorState {
    isOpen: boolean;
}

interface GatewaySelectorProps extends RouteComponentProps<{}>, GatewaysActionsType {
    isLoading: boolean;
    selectedGateway: string;
    items: IDropdownItem[];
    onChange?(gatewayId: string): void;
}

class GatewaysDropdown extends React.Component<GatewaySelectorProps, GatewaySelectorState> {

    constructor(props: GatewaySelectorProps) {
        super(props);
        this.state = { isOpen: false };
    }

    toggle = (isOpen: boolean) => {
        this.setState({ isOpen: !isOpen });
    };

    onChange = ({ value }: IDropdownItem) => {
        this.props.selectGateway({ gatewayId: value })
    };

    componentDidMount() {
        this.props.requestGatewaysList();
    }

    private getSelectedText(): string {
        const { selectedGateway, items } = this.props;
        const gateway = items.find(i => i.value === selectedGateway);
        return gateway ? gateway.text : 'Select...';
    }

    render() {
        return (
            <Dropdown items={this.props.items} isOpen={this.state.isOpen} toggle={this.toggle} onChange={this.onChange}>
                <span>{this.props.isLoading ? 'Loading...' : this.getSelectedText()}</span>
            </Dropdown>
        );
    }
}


export const GatewaySelector = connect(
    ({ gateways }: { gateways: GatewaysState }, props: any) => {

        const items = gateways.gateways.map(i => ({ text: i.name, value: i._id }));

        const { selectedGateway, isLoading } = gateways;

        return { ...props, ...{ items, selectedGateway, isLoading } };
    }, // Selects which state properties are merged into the component's props
    (dispatch) => bindActionCreators(GatewaysActions, dispatch)           // Selects which action creators are merged into the component's props
)(GatewaysDropdown);