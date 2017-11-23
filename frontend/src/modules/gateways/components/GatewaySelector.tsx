import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { GatewaysState, GatewayInfo, GatewaysActionsType } from 'modules/gateways';
import { DropdownMenu, Dropdown, DropdownToggle, DropdownItem } from 'reactstrap';

// At runtime, Redux will merge together...
type GatewayListProps =
    RouteComponentProps<{}>
    & GatewaysState        // ... state we've requested from the Redux store
    & GatewaysActionsType      // ... plus action creators we've requested    
//& RouteComponentProps<any>
interface GatewaySelectorState {
    isOpen: boolean;
    selectedName: string;
}
export class GatewaySelector extends React.Component<GatewayListProps, GatewaySelectorState> {

    constructor(props: GatewayListProps) {
        super(props);
        this.state = { isOpen: false, selectedName: 'Select...' };
    }

    componentWillMount() {
        // This method runs when the component is first added to the page        
        this.props.requestGatewaysList();
    }

    public render() {
        return <div>
            <h1>Gateways List</h1>
            <p>Select gateway...</p>
            {this.renderGateways()}
        </div>;
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    select(selected: GatewayInfo) {
        this.setState({ selectedName: selected.name });
    }

    private renderGateways() {
        return (
            <Dropdown isOpen={this.state.isOpen} toggle={() => this.toggle()}>
                <DropdownToggle caret>{this.props.isLoading ? <span>Loading...</span> : this.state.selectedName}</DropdownToggle>
                <DropdownMenu>
                    {this.props.gateways.map(gateway => {
                        return <DropdownItem onClick={this.select.bind(this, gateway)}>{gateway.name}</DropdownItem>
                    })}
                </DropdownMenu>
            </Dropdown>
        );
    }
}
