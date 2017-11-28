import { ModuleManifest } from 'types';
import { renderRoutes } from './routes'
import reducers from './reducers';
import { AccountLayout } from './layouts';
//export * from './containers';
export * from './state';

export const AccountModuleInfo: ModuleManifest = {
    version: '1.0',
    name: 'accounts',
    reducer: reducers,
    routes: renderRoutes,
    layouts: {
        'account': AccountLayout
    },
    menuItems: [
    ]
};