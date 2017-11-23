import * as React from 'react';
import { GatewaysReducer } from './reducers';
import { renderRoutes } from './routes';
import { NavLink } from 'react-router-dom';
export * from './actions';
export * from './state';

export const GatewaysModuleInfo = {
    version: '1.0',
    name: 'gateways',
    reducer: GatewaysReducer,
    routes: renderRoutes,
    menuItems: [
        {
            order: 0,
            render() {
                return (
                    <NavLink className="nav-link" to="/gateways/select">Select</NavLink>
                );
            }
        }
    ]
};