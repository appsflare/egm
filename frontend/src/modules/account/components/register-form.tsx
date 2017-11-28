import * as React from 'react';
import { InjectedFormProps, Field } from 'redux-form';
import { Form, Header, Icon, Button, Message, Segment } from 'semantic-ui-react';
import { renderField } from 'lib';

export interface IRegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

const UserField = renderField('user');
const PasswordField = renderField('lock');

export class RegisterForm extends React.Component<InjectedFormProps<IRegisterFormData>>{

    render() {
        const { submitting, pristine, error } = this.props;
        return (
            <Form size="large" className="register-form" onSubmit={this.props.handleSubmit}>
                <Header color="teal"><Icon name="user" size="large" />
                    <Header.Content> Register </Header.Content>
                </Header>
                <Segment stacked>
                    <Field className="mb-4" name="email" label="Email" type="email" component={UserField} />
                    <Field className="mb-4" name="password" label="Password" type="password" component={PasswordField} />
                    <Field className="mb-4" name="confirmPassword" label="Confirm Password" type="password" component={PasswordField} />
                    <Button color="green" disabled={pristine || submitting} block>Create Account</Button>
                    {error && <Message visible error>{error}</Message>}
                </Segment>
            </Form>

        );
    }

}