import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { INavigationMenuItem, Footer, Header, Sidebar, MenuGroup } from 'modules/core';
import { Container } from 'reactstrap';

import { HomePage } from 'pages/HomePage';
import { NotFoundPage } from 'pages/NotFoundPage';
import modules from 'modules';

function extractMenuItems() {
  return modules.map(i => i.menuItems || [])
    .reduce((prev, curr) => prev.concat(curr), []);
}

function extractMenuItemsbyGroup(items: INavigationMenuItem[], group: MenuGroup) {
  return items.filter(i => i.group === group);
}

const allMenuItems = extractMenuItems();

const headerMenuProps = {
  left: extractMenuItemsbyGroup(allMenuItems, MenuGroup.TopLeft),
  right: extractMenuItemsbyGroup(allMenuItems, MenuGroup.TopRight),
};

export const router = (

  <div className="app">
    <Header {...headerMenuProps} />
    <div className="app-body">
      <Sidebar />
      <main className="main">
        {/* <Breadcrumb /> */}
        <Container fluid>
          <Switch>
            <Route key="home" exact path='/' component={HomePage} />
            {modules.map(i => i.routes())}
            <Route key="404" component={NotFoundPage} />
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
