import * as React from 'react';
import { Route } from 'react-router-dom';
// import { GatewayModule } from './containers';
import { HomePage } from './pages';
import { IRouteBuilderContext } from 'types';


export function renderRoutes(context: IRouteBuilderContext) {
    const AppLayout = context.getLayout('app');
    return (
        <AppLayout key="core" {...context}>
            <Route key="home" exact path="/" component={HomePage} />
            <Route key="home" exact path="/col" component={HomePage} />            
        </AppLayout>
    );
}