import * as React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

import { INavigationMenuItem } from './NavigationMenu';

import * as _ from 'lodash';

//import { NavLink } from 'react-router-dom';

interface IHeaderProps {
  left: INavigationMenuItem[];
  right: INavigationMenuItem[];
}

export class Header extends React.Component<IHeaderProps> {

  private renderMenuItems(position: 'left' | 'right', items: INavigationMenuItem[]) {
    const children = _.sortBy(items, 'order').map(i => {
      return (
        <Menu.Item position={position} key={i.key} >
          {i.render()}
        </Menu.Item>
      );
    });

    return children;
  }

  render() {
    const { left, right } = this.props;
    return (

      <header className="app-header">

        <Menu inverted fixed="top">
          <Menu.Item>
            <Menu.Header>
              <Icon fitted circular name="wrench" color="teal" />
            </Menu.Header>
          </Menu.Item>

          {this.renderMenuItems("left", left)}

          {this.renderMenuItems("right", right)}

        </Menu>


      </header>
    );
  }
}