import * as React from 'react';
import { InjectedFormProps, Field } from 'redux-form';
import { Form, Button, Segment, Header, Icon } from 'semantic-ui-react';
import { renderField } from 'lib';

export interface ILoginFormData {
    email: string;
    password: string;
}

const UserField = renderField('user');
const PasswordField = renderField('lock');

export class LoginForm extends React.Component<InjectedFormProps<ILoginFormData>>{

    render() {
        const { submitting, pristine } = this.props;
        return (
            <Form size="large" onSubmit={this.props.handleSubmit}>
                <Header color="teal"><Icon name="user" size="large" />
                    <Header.Content> Login </Header.Content>
                </Header>
                <Segment stacked>
                    <Field className="mb-3" name="email" label="Email" type="email" component={UserField} />
                    <Field className="mb-4" name="password" label="Password" type="password" component={PasswordField} />
                    <Button type="submit" color="green" disabled={pristine || submitting}>Login</Button>

                    {/* <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0">Forgot password?</Button>
                                                </Col> */}
                </Segment>
            </Form>

        );
    }

}