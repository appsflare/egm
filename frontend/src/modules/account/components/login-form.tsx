import * as React from 'react';
import { Form, InjectedFormProps, Field } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';
import { renderFieldGroup } from 'lib';

export interface ILoginFormData {
    email: string;
    password: string;
}

const UserField = renderFieldGroup('icon-user');
const PasswordField = renderFieldGroup('icon-user');

export class LoginForm extends React.Component<InjectedFormProps<ILoginFormData>>{

    render() {
        const { submitting, pristine } = this.props;
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <h1>Login</h1>
                <p className="text-muted">Sign In to your account</p>
                <Field className="mb-3" name="email" label="Email" type="email" component={UserField} />
                <Field className="mb-4" name="password" label="Password" type="password" component={PasswordField} />
                <Row>
                    <Col xs="6">
                        <Button type="submit" color="primary" className="px-4" disabled={pristine || submitting}>Login</Button>
                    </Col>
                    {/* <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0">Forgot password?</Button>
                                                </Col> */}
                </Row>
            </Form>

        );
    }

}