import React from 'react';
import { ReactNode } from 'react';
import { Nav, NavItem } from 'reactstrap';

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
    className:string;
    items: INavigationMenuItem[];
}


export class NavigationMenu extends React.Component<INavigationMenuProps> {
    constructor(props: INavigationMenuProps) {
        super(props);
    }

    renderItem(item: INavigationMenuItem) {
        return (
            <NavItem key={item.key} className="px-3">
                {item.render()}
            </NavItem>
        );
    }

    public render() {
        return (
            <Nav className={this.props.className} navbar>
                {this.props.items.map(i => this.renderItem(i))}
            </Nav>
        );
    }
}
