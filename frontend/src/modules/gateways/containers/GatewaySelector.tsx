import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { GatewaysActions, IGatewaysState, GatewaysActionsType } from 'modules/gateways';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'semantic-ui-react';

interface GatewaySelectorState {
    isOpen: boolean;
}

interface IDropdownItem {
    text: string; value: any;
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

    render() {
        const { isLoading, items } = this.props;
        return (
            <Dropdown button floating labeled icon="world" search text="Select Gateway" noResultsMessage="No Gatewats to select"
                loading={isLoading}
                isOpen={this.state.isOpen}
                options={items.map(i => ({ key: i.value, text: i.text }))}
                toggle={this.toggle} />
        );
    }
}


export const GatewaySelector = connect(
    ({ gateways }: { gateways: IGatewaysState }, props: any) => {

        const items = gateways.gateways.map(i => ({ text: i.name, value: i._id }));

        const { selectedGateway, isLoading } = gateways;

        return { ...props, ...{ items, selectedGateway, isLoading } };
    }, // Selects which state properties are merged into the component's props
    (dispatch) => bindActionCreators(GatewaysActions, dispatch)           // Selects which action creators are merged into the component's props
)(GatewaysDropdown);    