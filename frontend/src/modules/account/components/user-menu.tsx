import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';


import { ILoginState } from "../state";
import { LoginActionsType } from "../actions";

interface IUserMenuProps extends LoginActionsType, RouteComponentProps<{}>, ILoginState {
    isLoggingOut: boolean;
}

export class UserMenu extends React.Component<IUserMenuProps> {

    renderLoginLink() {
        return (
            <NavLink to="/app/account/login">Login</NavLink>
        );
    }

    private logout = () => {
        this.props.logout();
    };

    renderUserMenu() {
        const { account } = this.props;
        if (account == null) {
            return null;
        }
        const { isLoggingOut } = this.props;
        return (
            <Dropdown icon="user" item text={account.email} loading={isLoggingOut}>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={this.logout} icon={{ name: 'log out' }} text="Logout" />
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    render() {
        const { isLoggedIn } = this.props;
        return (isLoggedIn ? this.renderUserMenu() : this.renderLoginLink());
    }
}