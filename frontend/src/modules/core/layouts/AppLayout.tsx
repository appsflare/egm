import * as React from 'react';
import { Footer, Header, Sidebar, MenuGroup } from 'modules/core';
import { Container } from 'reactstrap';
import { ILayoutProps } from 'types';

export class AppLayout extends React.Component<ILayoutProps> {

    private readonly headerMenuProps: any;
    constructor(props: ILayoutProps) {
        super(props);
        this.headerMenuProps = {
            left: props.getMenuItemsByGroup(MenuGroup.TopLeft),
            right: props.getMenuItemsByGroup(MenuGroup.TopRight),
        };
    }

    render() {

        return (
            <div className="app">
                <Header {...this.headerMenuProps} />
                <div className="app-body">
                    <Sidebar />
                    <main className="main">
                        {/* <Breadcrumb /> */}
                        <Container fluid>
                            {this.props.children}
                        </Container>
                    </main>
                    <aside className="aside-menu">
                        {/*Aside Menu*/}
                    </aside>
                </div>
                <Footer />
            </div>
        );
    }

};