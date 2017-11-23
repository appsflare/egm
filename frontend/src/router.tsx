import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Footer, Header, Sidebar } from 'modules/core';
import { Container } from 'reactstrap';

import { HomePage } from 'pages/HomePage';
import { NotFoundPage } from 'pages/NotFoundPage';
import modules from 'modules';

function extractMenuItems() {
  return modules.map(i => i.menuItems || []).reduce((prev, curr) => prev.concat(curr), []);
}

export const router = (


  <div className="app">
    <Header navigationMenu={{ items: extractMenuItems() }} />
    <div className="app-body">
      <Sidebar />
      <main className="main">
        {/* <Breadcrumb /> */}
        <Container fluid>
          <Switch>
            <Route exact path='/' component={HomePage} />
            {modules.map(i => i.routes())}
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </main>
      <aside className="aside-menu">
        {/*Aside Menu*/}
      </aside>
    </div>
    <Footer />
  </div>
);
