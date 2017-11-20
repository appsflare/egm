import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Footer } from 'components/Footer';
import { Header } from 'components/Header';

import { HomePage } from 'pages/HomePage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ReactPage } from 'pages/ReactPage';
import { Gateways } from 'modules'

export const router = (
  <div>
    <Header />
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/react' component={ReactPage} />
      {Gateways.renderRoutes()}
      <Route component={NotFoundPage} />
    </Switch>
    <Footer />
  </div>
);
