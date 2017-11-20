import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { GatewaysState, GatewaysActionsType } from 'modules/gateways';

// At runtime, Redux will merge together...
type GatewayListProps =
    RouteComponentProps<{}>
    & GatewaysState        // ... state we've requested from the Redux store
    & GatewaysActionsType      // ... plus action creators we've requested    
//& RouteComponentProps<any>

export class GatewaySelector extends React.Component<GatewayListProps, {}> {
    componentWillMount() {        
        // This method runs when the component is first added to the page        
        this.props.requestGatewaysList();
    }   

    public render() {
        return <div>
            <h1>Gateways List</h1>
            <p>List of available gateways.</p>
            {this.renderGatewaysTable()}
            {this.renderPagination()}
        </div>;
    }

    private renderGatewaysTable() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Admin API.</th>
                </tr>
            </thead>
            <tbody>
                {this.props.gateways.map(gateway =>
                    <tr key={gateway.name}>
                        <td>{gateway.name}</td>
                        <td>{gateway.adminApi}</td>
                        <td><Link to={`/gateways/${gateway.name}`}>Select</Link></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }

    private renderPagination() {
        return <p className='clearfix text-center'>
            {this.props.isLoading ? <span>Loading...</span> : []}
        </p>;
    }
}
