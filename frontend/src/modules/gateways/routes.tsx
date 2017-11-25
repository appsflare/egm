import * as React from 'react';
// import { GatewayModule } from './containers';
import { SelectGatewayPage } from './pages';
import { IRouteBuilderContext } from 'types';
import { Route } from 'react-router-dom';

export function renderRoutes(context: IRouteBuilderContext) {
    const AppLayout = context.getLayout('app');
    return (
        <AppLayout key="gateways" {...context}>
            <Route key="select-gateway" path="/gateways/select" component={SelectGatewayPage} />
        </AppLayout>
    );
}