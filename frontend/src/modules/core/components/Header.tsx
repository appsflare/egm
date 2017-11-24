import * as React from 'react';
import {
  // Nav,
  // NavItem,
  NavbarToggler,
  NavbarBrand

} from 'reactstrap';

import { NavigationMenu, INavigationMenuItem } from './NavigationMenu';

//import { NavLink } from 'react-router-dom';

interface IHeaderProps {
  left: INavigationMenuItem[];
  right: INavigationMenuItem[];
}

export class Header extends React.Component<IHeaderProps> {

  sidebarToggle(e: any) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e: any) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e: any) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e: any) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    const { left, right } = this.props;
    return (

      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <NavbarBrand cssModule={{ textAlign: 'center' }} href="/">EGM</NavbarBrand>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <NavigationMenu className="d-md-down-none" items={left} />
        <NavigationMenu className="ml-auto" items={right} />

        <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
      </header>
    );
  }
}