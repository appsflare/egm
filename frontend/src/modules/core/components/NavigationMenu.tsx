import { ReactNode } from 'react';

export enum MenuGroup {
    TopLeft = 1,
    TopRight = 2,
    SidebarLeft = 3,
    SidebarRight = 4
}

export interface IMenuItem {
    key: string;
    order: number;
    render(): ReactNode;
}

export interface INavigationMenuItem extends IMenuItem {
    group: MenuGroup;
    children?: IMenuItem[];
}