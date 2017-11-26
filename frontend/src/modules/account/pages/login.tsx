import * as React from 'react';
import { Col, CardGroup, CardBody, Card, Button } from 'reactstrap';
import { LoginFormContainer } from '../containers';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IAccountState } from '../state';

import { AccountActions, AccountActionsType } from '../actions';
import { Redirect } from 'react-router';

interface LoginPageProps extends AccountActionsType {
    isLoggedIn: boolean;
    isLoggingIn: boolean;
}


class LoginPageComp extends React.Component<LoginPageProps> {

    onSubmit = (values: any) => {
        this.props.login(values);
    }

    render() {
        const { isLoggedIn, isLoggingIn } = this.props;

        if (isLoggedIn) {
            <Redirect to="/app" />
        }

        return (
            <Col md="8">
                <CardGroup>
                    <Card className="p-4">
                        <CardBody>
                            {isLoggingIn ? 'Please wait...' : <LoginFormContainer onSubmit={this.onSubmit} form="login" />}
                        </CardBody>
                    </Card>
                    <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                        <CardBody className="text-center">
                            <div>
                                <h2>Create Account</h2>
                                <p>Create a new account to start managing your express gateway instances.</p>
                                <Button color="primary" className="mt-3" active>Register Now!</Button>
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
    const { isLoggingIn, isLoggedIn } = accounts;
    return { isLoggingIn, isLoggedIn, ...props };
}, (dispatch) => bindActionCreators(AccountActions, dispatch))(LoginPageComp);