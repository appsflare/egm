import * as React from 'react';
import { Col, CardGroup, CardBody, Card, Button, Alert } from 'reactstrap';
import { LoginFormContainer } from '../containers';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IAccountState } from '../state';

import { AccountActions, AccountActionsType } from '../actions';
import { Redirect, withRouter, RouteComponentProps } from 'react-router';

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
            <Col md="8">
                <CardGroup>
                    <Card className="p-4">
                        <CardBody>
                            {flashMessage && <Alert>{flashMessage}</Alert>}
                            {isLoggingIn ? 'Please wait...' : <LoginFormContainer form="login" />}
                        </CardBody>
                    </Card>
                    <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                        <CardBody className="text-center">
                            <div>
                                <h2>Create Account</h2>
                                <p>Create a new account to start managing your express gateway instances.</p>
                                <Button color="primary" className="mt-3" active onClick={this.gotoRegister} >Register Now!</Button>
                            </div>
                        </CardBody>
                    </Card>
                </CardGroup>
            </Col>
        );
    }

}


export const LoginPage = connect((state: { accounts: IAccountState }, props: any) => {
    const { accounts } = state;
    return { ...accounts, ...props };
}, (dispatch) => bindActionCreators(AccountActions, dispatch))(withRouter(LoginPageComp));