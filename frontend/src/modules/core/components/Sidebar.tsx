import * as React from 'react';
import { SidebarMinimizer } from './SidebarMinimizer';
import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';
export class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <SidebarHeader />
                {/*<SidebarForm /> */}
                <nav className="sidebar-nav">
                    {/* <Nav>
                        {navList(nav.items)}
                    </Nav> */}
                </nav>
                <SidebarFooter />
                <SidebarMinimizer />
            </div>
        )
    }
}