import { ModuleManifest } from 'types';
import { renderRoutes } from './routes'
import { AppLayout } from './layouts';
import reducers from './reducers';
export * from './components';


export const CoreModuleInfo: ModuleManifest = {
    version: '1.0',
    name: 'core',
    reducer: reducers,
    routes: renderRoutes,
    layouts: {
        'app': AppLayout
    },
    menuItems: [
    ]
};