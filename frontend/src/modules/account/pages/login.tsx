import * as React from 'react';
import { GridColumn, Button, Message } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, withRouter, RouteComponentProps } from 'react-router';

import { LoginFormContainer } from '../containers';
import { IApplicationState } from '../state';
import { AccountActions, AccountActionsType } from '../actions';


interface LoginPageProps extends AccountActionsType, RouteComponentProps<any> {
    isLoggedIn: boolean;
    isLoggingIn: boolean;
    error?: string;
}


class LoginPageComp extends React.Component<LoginPageProps> {

    // onSubmit = (values: any) => {
    //     return this.props.login(values).payload.promise;
    // }

    componentDidMount() {
        this.props.checkLogin();
    }

    gotoRegister = () => {
        this.props.history.push('/app/account/register');
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
                    Create a new account to start managing your express gateway instances.<Button color="green" active onClick={this.gotoRegister} >Register Now!</Button>
                </Message>
            </GridColumn>
        );
    }

}


export const LoginPage = connect((state: IApplicationState, props: any) => {
    const { accounts: { login } } = state;
    return { ...login, ...props };
}, (dispatch) => bindActionCreators(AccountActions, dispatch))(withRouter(LoginPageComp));