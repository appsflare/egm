import * as React from 'react';
// import { GatewayModule } from './containers';
import { SelectGatewayPage } from './pages';
import { IRouteBuilderContext } from 'types';
import { PrivateRoute } from 'modules/shared';
export function renderRoutes(context: IRouteBuilderContext) {
    const AppLayout = context.getLayout('app');
    return (
        <PrivateRoute exact key="select-gateway" path="/app/gateways" render={(props: any) => (
            <AppLayout {...context}>
                <SelectGatewayPage {...props} />
            </AppLayout>
        )} />
    );
}