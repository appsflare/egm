import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { createBrowserHistory } from 'history';

import { App } from 'App';
import { configureStore } from 'store';


import modules from 'modules';
import { MenuGroup } from 'modules/core';
import { IRouteBuilderContext } from 'types';


const moduleMetas = modules
  .map(i => ({ menuItems: i.menuItems || [], layouts: i.layouts || {} }))
  .reduce((prev, curr) => {
    return {
      menuItems: prev.menuItems.concat(curr.menuItems),
      layouts: { ...prev.layouts, ...curr.layouts }
    }
  }, { menuItems: [], layouts: {} });


export function buildRoutes() {

  const routeContext: IRouteBuilderContext = {
    getLayout(name: string) {
      return moduleMetas.layouts[name];
    },
    getMenuItemsByGroup(group: MenuGroup) {
      return moduleMetas.menuItems.filter(i => i.group === group);
    }
  };
  return modules.map(i => i.routes(routeContext));
}


export function buidReducers() {

  const moduleReducers: any = {};
  modules.forEach(m => (moduleReducers[m.name] = m.reducer));
  return moduleReducers;
}



// To keep reducers self-sufficient and reusable, we choose to not set
// initial state here, and let each reducer to handle the default state
// https://github.com/reactjs/redux/issues/1189#issuecomment-168025590
const initialState = {};

// Create browser history
const history = createBrowserHistory();

// Configure store
const store = configureStore(initialState, history, buidReducers());

// Create render function
const render = (Component: any) => {
  ReactDom.render(
    <AppContainer>
      <Component routes={buildRoutes()} store={store} history={history} />
    </AppContainer>,
    document.getElementById('root'),
  );
};

// First time render
render(App);

// Hot Reload Module API
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('App').App;
    render(NextApp);
  });
}
