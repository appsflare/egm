import * as React from 'react';
import { GridColumn, Message } from 'semantic-ui-react';
import { RegisterFormContainer } from '../containers';
import { connect } from 'react-redux';
import { IApplicationState } from '../state';
import { bindActionCreators } from 'redux';
import { LoginActions } from '../actions';
import { RouteComponentProps, withRouter, NavLink } from 'react-router-dom';


class RegisterPageComp extends React.Component<RouteComponentProps<{}>> {    

    render() {
        return (
            <GridColumn width="6">
                <RegisterFormContainer onSubmitSuccess={() => {
                    this.props.history.push('/app/account/login', {
                        message: 'Successfully created your account!'
                    });
                }} />
                <Message>
                    Already have an account? <NavLink to="app/account/login">Login Now!</NavLink>
                </Message>
            </GridColumn>
        );
    }
}

export const RegisterPage = connect((state: IApplicationState, props: any) => {
    const { accounts: { registration } } = state;
    return { ...registration, ...props };
}, (dispatch) => bindActionCreators(LoginActions, dispatch))(withRouter(RegisterPageComp));