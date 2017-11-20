import { GatewaysReducer } from './reducers';
import { renderRoutes } from './routes';
export * from './actions';
export * from './state';

export const GatewaysModuleInfo = {
    version: '1.0',
    name: 'gateways',
    reducer: GatewaysReducer,
    routes: renderRoutes
};