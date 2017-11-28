import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { Route, Switch } from 'react-router-dom';
import { NotFoundPage } from 'modules/core/pages';

// import { DevTools } from 'containers/DevTools';

// import { isProduction } from 'utils';
import './styles/semantic.css';
import 'image/favicon.ico';
import "scss/styles.scss"
// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';


interface IAppProps {
  store: Store<any>;
  history: History;
  routes: any;
}

// Set the store, history and routers
export class App extends React.Component<IAppProps, {}> {
  public render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <Switch>
            {this.props.routes}
            <Route component={NotFoundPage} />
            {/* {!isProduction && <DevTools />} */}
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
