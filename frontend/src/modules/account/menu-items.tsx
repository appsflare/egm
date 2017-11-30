import * as React from 'react';
import { INavigationMenuItem, MenuGroup } from 'modules/core';
import { UserMenuContainer } from './containers';

export const menuItems: INavigationMenuItem[] = [
    {
        key: 'user-menu',
        group: MenuGroup.TopRight,
        order: 1,
        render() {
            return (
                <UserMenuContainer />
            );
        }
    }
];