import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { GatewaysActions, IGatewaysState, GatewaysActionsType } from 'modules/gateways';
import { bindActionCreators } from 'redux';
import { Dropdown, DropdownProps } from 'semantic-ui-react';

interface IDropdownItem {
    text: string; value: any;
}

interface GatewaySelectorProps extends RouteComponentProps<{}>, GatewaysActionsType {
    isLoading: boolean;
    selectedGateway: string;
    items: IDropdownItem[];
    onChange?(gatewayId: string): void;
}

class GatewaysDropdown extends React.Component<GatewaySelectorProps> {

    constructor(props: GatewaySelectorProps) {
        super(props);
        this.state = { isOpen: false };
    }

    private onChange = (event: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
        event.preventDefault();
        this.props.selectGateway({ gatewayId: value as string })
    };

    componentDidMount() {
        this.props.requestGatewaysList();
    }

    render() {
        const { isLoading, items } = this.props;
        return (
            <Dropdown floating labeled className="icon" icon="world" search text="Select Gateway" noResultsMessage="No Gatewats to select"
                loading={isLoading}
                onChange={this.onChange}                
                options={items.map(i => ({ key: i.value, text: i.text }))}
            />
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