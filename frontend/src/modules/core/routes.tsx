import * as React from 'react';
//import { Route } from 'react-router-dom';
//import { GatewayModule } from './containers';
import { HomePage } from './pages';
import { IRouteBuilderContext } from 'types';
import { PrivateRoute } from 'modules/shared';



export function renderRoutes(context: IRouteBuilderContext) {
    const AppLayout = context.getLayout('app');
    return (
        [
            <PrivateRoute exact key="home" path="/" render={(props: any) => (
                <AppLayout {...context}>
                    <HomePage {...props} />
                </AppLayout>
            )} />,
            <PrivateRoute exact key="app" path="/app" render={(props: any) => (
                <AppLayout {...context}>
                    <HomePage {...props} />
                </AppLayout>
            )} />
        ]
    );
}