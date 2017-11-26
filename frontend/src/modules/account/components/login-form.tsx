import * as React from 'react';
import { Form, InjectedFormProps, Field } from 'redux-form';
import { Row, Col, Button, InputGroup, InputGroupAddon, Input, FormGroup, FormFeedback } from 'reactstrap';

export interface ILoginFormData {
    email: string;
    password: string;
}

function renderFieldGroup(icon: string) {
    return function ({ className, input, label, type, meta: { touched, error } }: any) {
        return (
            <FormGroup>
                <InputGroup className={className}>
                    <InputGroupAddon><i className={icon}></i></InputGroupAddon>
                    <Input {...input} type={type} placeholder={label} valid={touched && !error} />
                </InputGroup>
                {touched && error && (<FormFeedback>error</FormFeedback>)}
            </FormGroup>
        );
    };
}

export class LoginForm extends React.Component<InjectedFormProps<ILoginFormData>>{

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <h1>Login</h1>
                <p className="text-muted">Sign In to your account</p>
                <Field className="mb-3" name="email" label="Email" type="email" component={renderFieldGroup('icon-user')} />
                <Field className="mb-4" name="password" label="Password" type="password" component={renderFieldGroup('icon-lock')} />
                <Row>
                    <Col xs="6">
                        <Button type="submit" color="primary" className="px-4">Login</Button>
                    </Col>
                    {/* <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0">Forgot password?</Button>
                                                </Col> */}
                </Row>
            </Form>

        );
    }

}