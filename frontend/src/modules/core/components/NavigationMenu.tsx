import React from 'react';
import { ReactNode } from 'react';
import { Nav, NavItem } from 'reactstrap';

export interface INavigationMenuItem {
    order: number;
    render(): ReactNode;
}

export interface INavigationMenuProps {
    items: INavigationMenuItem[];
}


export class NavigationMenu extends React.Component<INavigationMenuProps> {
    constructor(props: INavigationMenuProps) {
        super(props);
    }

    renderItem(item: INavigationMenuItem) {
        return (
            <NavItem className="px-3">
                {item.render()}
            </NavItem>
        );
    }

    public render() {
        return (
            <Nav className="d-md-down-none" navbar>
                {this.props.items.map(i => this.renderItem(i))}
            </Nav>
        );
    }
}
