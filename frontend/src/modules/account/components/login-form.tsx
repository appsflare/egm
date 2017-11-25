import * as React from 'react';
import { Form, InjectedFormProps } from 'redux-form';
import { Container, Row, Col, CardGroup, CardBody, Card, Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';

export interface ILoginFormData {
    email: string;
    password: string;
}

export class LoginForm extends React.Component<InjectedFormProps>{

    render() {
        return (


            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit={this.props.handleSubmit}>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                                                <Input type="text" placeholder="Username" />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                                                <Input type="password" placeholder="Password" />
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4">Login</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0">Forgot password?</Button>
                                                </Col>
                                            </Row>
                                        </Form>
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
                    </Row>
                </Container>

            </div>



        );
    }

}