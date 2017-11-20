import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { GatewaysState, GatewaysActionCreatorsType } from 'modules/gateways';
import { bindActionCreators } from 'redux';

// At runtime, Redux will merge together...
type GatewayListProps =
    RouteComponentProps<{}>
    & GatewaysState        // ... state we've requested from the Redux store
    & GatewaysActionCreatorsType      // ... plus action creators we've requested    
//& RouteComponentProps<any>

export class SelectGateway extends React.Component<GatewayListProps, {}> {
    componentWillMount() {
        // This method runs when the component is first added to the page        
        this.props.requestGatewaysList();
    }

    componentWillReceiveProps(nextProps: GatewayListProps) {
        // This method runs when incoming props (e.g., route params) change        
        //this.props.requestGatewaysList();
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
        let prevStartDateIndex = (0) - 5;
        let nextStartDateIndex = (0) + 5;

        return <p className='clearfix text-center'>
            {this.props.isLoading ? <span>Loading...</span> : []}
        </p>;
    }
}
