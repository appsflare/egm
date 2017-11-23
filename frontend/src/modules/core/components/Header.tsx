import * as React from 'react';
import {
  // Nav,
  // NavItem,
  NavbarToggler,
  NavbarBrand,
  Nav
  
} from 'reactstrap';



import { NavigationMenu, INavigationMenuProps } from './NavigationMenu';
//import { NavLink } from 'react-router-dom';

interface IHeaderProps {
  navigationMenu: INavigationMenuProps;
}


// export class Header extends React.Component<IHeaderProps> {
//   constructor(props: IHeaderProps) {
//     super(props);

//   }

//   public render() {
//     return (
//       <nav>
//         <div className='nav-wrapper'>
//           <div className='container'>
//             <span className='brand-logo'>
//               <NavLink exact={true} activeClassName='active-link' to='/'>EGM</NavLink>
//             </span>

//           </div>
//         </div>
//       </nav>
//     );
//   }
// }


export class Header extends React.Component<IHeaderProps> {

  sidebarToggle(e: any) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e: any) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e: any) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e: any) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (

      <header className="app-header navbar">
      <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
        <span className="navbar-toggler-icon"></span>
      </NavbarToggler>
      <NavbarBrand cssModule={{ textAlign: 'center' }} href="/">EGM</NavbarBrand>
      <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
        <span className="navbar-toggler-icon"></span>
      </NavbarToggler>
      <NavigationMenu {...this.props.navigationMenu} />
      <Nav className="ml-auto" navbar/>
     
      
      <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
        <span className="navbar-toggler-icon"></span>
      </NavbarToggler>
    </header>
    );
  }
}