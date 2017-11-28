import * as React from 'react';
import { Route } from 'react-router-dom';

export function RouteWithLayout({ layout, component: Component, getLayout, ...rest }:& any) {
    const Layout = getLayout(layout);
    return (
        <Route {...rest} render={(props) =>
            <Layout {...props}>
                <Component {...props} />
            </Layout>
        } />
    );
}