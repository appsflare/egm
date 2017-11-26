import * as React from 'react';
import { IRouteBuilderContext } from 'types';
import { Route } from 'react-router-dom';
import { LoginPage, RegisterPage } from './pages';


export function renderRoutes(context: IRouteBuilderContext) {

    const AccountLayout = context.getLayout('account');

    return ([

        <Route exact key="login" path="/app/account/login" render={(props: any) => (
            <AccountLayout {...context}>
                <LoginPage {...props} />
            </AccountLayout>
        )} />,
        <Route exact key="register" path="/app/account/register" render={(props: any) => (
            <AccountLayout {...context}>
                <RegisterPage {...props} />
            </AccountLayout>
        )} />
    ]
    );
}