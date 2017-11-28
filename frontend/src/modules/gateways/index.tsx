import * as React from 'react';
import { GatewaysReducer } from './reducers';
import { renderRoutes } from './routes';
import { GatewaySelector } from './containers';
import { ModuleManifest } from 'types';
import { MenuGroup } from 'modules/core';
import { NavLink } from 'react-router-dom';

export * from './actions';
export * from './constants';
export * from './containers';
export * from './state';


export const GatewaysModuleInfo: ModuleManifest = {
    version: '1.0',
    name: 'gateways',
    reducer: GatewaysReducer,
    routes: renderRoutes,
    menuItems: [
        {
            key: 'gateway-selector',
            group: MenuGroup.TopLeft,
            order: 0,
            render() {
                return (
                    <GatewaySelector />
                );
            }
        },
        {
            key: 'gateways-list',
            group: MenuGroup.TopLeft,
            order: 1,
            render() {
                return (
                    <NavLink className="nav-link" to="/app/gateways" />
                );
            }
        }
    ]
};