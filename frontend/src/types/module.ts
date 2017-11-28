import { INavigationMenuItem, MenuGroup } from 'modules/core';
import { Reducer } from 'redux';
import * as React from 'react';
import { ReactNode } from 'react';

export interface ILayoutProps {
    getMenuItemsByGroup(group: MenuGroup): INavigationMenuItem[]
}

export interface ILayoutsMap {
    [key: string]: React.ComponentClass<ILayoutProps>;
}

export interface IRouteBuilderContext {
    getMenuItemsByGroup(group: MenuGroup): INavigationMenuItem[];
    getLayout(name: string): React.ComponentClass<ILayoutProps>;
}

export interface ModuleManifest {
    name: string;
    version: string;
    reducer: Reducer<any>;
    layouts?: ILayoutsMap;
    routes(context: IRouteBuilderContext): ReactNode;
    menuItems?: INavigationMenuItem[];
}