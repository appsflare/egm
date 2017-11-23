import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

// import { DevTools } from 'containers/DevTools';
import { router } from 'router';
// import { isProduction } from 'utils';

import 'image/favicon.ico';
// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import 'scss/style.scss'
// Temp fix for reactstrap
import 'scss/core/_dropdown-menu-right.scss'

interface IAppProps {
  store: Store<any>;
  history: History;
}

// Set the store, history and routers
export class App extends React.Component<IAppProps, {}> {
  public render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <div>
            {router}
            {/* {!isProduction && <DevTools />} */}
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
