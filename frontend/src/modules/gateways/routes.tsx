import * as React from 'react';
import { Route } from 'react-router-dom';
// import { GatewayModule } from './containers';
import { SelectGatewayPage } from './pages';

export function renderRoutes() {
    return (
        <Route key="select-gateway" path="/gateways/select" component={SelectGatewayPage} />
    );
}