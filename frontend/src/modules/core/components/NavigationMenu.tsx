import { ReactNode } from 'react';

export enum MenuGroup {
    TopLeft = 1,
    TopRight = 2,
    SidebarLeft = 3,
    SidebarRight = 4
}

export interface INavigationMenuItem {
    key: string;
    order: number;
    render(): ReactNode;
    group: MenuGroup;
}

export interface INavigationMenuProps {    
    items: INavigationMenuItem[];
}