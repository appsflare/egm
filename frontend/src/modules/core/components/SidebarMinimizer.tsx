import * as React from 'react';

export class SidebarMinimizer extends React.Component {

    sidebarMinimize() {
        document.body.classList.toggle('sidebar-minimized');
    }

    brandMinimize() {
        document.body.classList.toggle('brand-minimized');
    }

    minimize = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.sidebarMinimize();
        this.brandMinimize();
    }

    render() {
        return (
            <button className="sidebar-minimizer" type="button" onClick={this.minimize} />
        )
    }
}