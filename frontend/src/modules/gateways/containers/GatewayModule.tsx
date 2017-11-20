import * as React from 'react';

export class GatewayModule extends React.Component<any, any>{
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}