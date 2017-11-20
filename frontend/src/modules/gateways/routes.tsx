import { Route } from 'react-router-dom';
import { GatewayModule } from './containers';
import { SelectGatewayPage } from './pages';
export namespace Gateways {
    export function renderRoutes() {
        return (
            <Route path="/gateways" component={GatewayModule}>
                <Route path="/select" component={SelectGatewayPage} />
            </Route>
        );
    }
}