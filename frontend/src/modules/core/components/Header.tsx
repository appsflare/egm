import * as React from 'react';
import {
  // Nav,
  // NavItem,
  Menu

} from 'semantic-ui-react';

import { INavigationMenuItem } from './NavigationMenu';

import * as _ from 'lodash';

//import { NavLink } from 'react-router-dom';

interface IHeaderProps {
  left: INavigationMenuItem[];
  right: INavigationMenuItem[];
}

export class Header extends React.Component<IHeaderProps> {

  private renderMenu(position: 'left' | 'right', items: INavigationMenuItem[]) {
    const children = _.sortBy(items, 'order').map(i => {
      return (
        <Menu.Item key={i.key} >
          {i.render()}
        </Menu.Item>
      );
    });

    return (
      <Menu.Menu position={position} children={children} />
    );
  }

  render() {
    const { left, right } = this.props;
    return (

      <header className="app-header navbar">

        <Menu>
          <Menu.Header content="EGM" />


          {this.renderMenu("left", left)}
          {this.renderMenu("right", right)}

        </Menu>


      </header>
    );
  }
}