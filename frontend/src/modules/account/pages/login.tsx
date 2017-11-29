import * as React from 'react';
import { GridColumn, Message } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, withRouter, RouteComponentProps, NavLink } from 'react-router-dom';

import { LoginFormContainer } from '../containers';
import { IApplicationState } from '../state';
import { LoginActions, LoginActionsType } from '../actions';


interface LoginPageProps extends LoginActionsType, RouteComponentProps<any> {
    isLoggedIn: boolean;
    isLoggingIn: boolean;
    error?: string;
}


class LoginPageComp extends React.Component<LoginPageProps> {

    componentDidMount() {
        this.props.checkLogin();
    }

    render() {
        const { isLoggedIn, isLoggingIn, location } = this.props;

        const { state } = location;

        const flashMessage = state && state.message;



        if (isLoggedIn) {
            return (
                <Redirect to="/app" />
            );
        }

        return (
            <GridColumn width="4">
                {flashMessage && <Message info visible>{flashMessage}</Message>}
                {isLoggingIn ? 'Please wait...' : <LoginFormContainer form="login" />}
                <Message>
                    Create a new account to start managing your express gateway instances. <NavLink to="/app/account/register">Register Now!</NavLink>
                </Message>
            </GridColumn>
        );
    }

}


export const LoginPage = connect((state: IApplicationState, props: any) => {
    const { accounts: { login } } = state;
    return { ...login, ...props };
}, (dispatch) => bindActionCreators(LoginActions, dispatch))(withRouter(LoginPageComp));