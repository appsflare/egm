import * as React from 'react';
import { Form, InjectedFormProps, Field } from 'redux-form';
import { Button, Alert } from 'reactstrap';
import { renderFieldGroup } from 'lib';

export interface IRegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

const UserField = renderFieldGroup('icon-user');
const PasswordField = renderFieldGroup('icon-lock');

export class RegisterForm extends React.Component<InjectedFormProps<IRegisterFormData>>{

    render() {
        const { submitting, pristine, error } = this.props;
        return (
            <Form className="register-form" onSubmit={this.props.handleSubmit}>
                <h1>Register</h1>
                <p className="text-muted">Create your account</p>
                <Field className="mb-4" name="email" label="Email" type="email" component={UserField} />
                <Field className="mb-4" name="password" label="Password" type="password" component={PasswordField} />
                <Field className="mb-4" name="confirmPassword" label="Confirm Password" type="password" component={PasswordField} />
                <Button color="success" disabled={pristine || submitting} block>Create Account</Button>
                {error && <Alert color="danger">{error}</Alert>}
            </Form>

        );
    }

}