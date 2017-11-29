import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IGatewaysState, GatewayInfo, GatewaysActionsType } from 'modules/gateways';
import { Dropdown } from 'semantic-ui-react';

// At runtime, Redux will merge together...
type GatewayListProps =
    RouteComponentProps<{}>
    & IGatewaysState        // ... state we've requested from the Redux store
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

    private toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    select(selected: GatewayInfo) {
        this.setState({ selectedName: selected.name });
    }

    private renderGateways() {
        const { gateways, isLoading } = this.props;
        return (
            <Dropdown button floating labeled icon="world" search text="Select Gateway" noResultsMessage="No Gatewats to select"
             loading={isLoading}
             isOpen={this.state.isOpen} 
             options={gateways.map(i => ({ key: i._id, text: i.name }))} 
             toggle={this.toggle}/>
        );
    }
}
