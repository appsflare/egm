import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout, SelectGatewayPage } from './pages';



export const routes = (
    <Layout>
        <Route exact path='/' component={SelectGatewayPage} />
        <Route path='/gateways' component={SelectGatewayPage} />
    </Layout>
);
