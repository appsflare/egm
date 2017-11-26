import * as React from 'react';
import { Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

export class RegisterPage extends React.Component {
    render() {
        return (
            <Col md="6">
                <Card className="mx-4">
                    <CardBody className="p-4">
                        <h1>Register</h1>
                        <p className="text-muted">Create your account</p>
                        <InputGroup className="mb-3">
                            <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                            <Input type="text" placeholder="Username" />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroupAddon>@</InputGroupAddon>
                            <Input type="text" placeholder="Email" />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                            <Input type="password" placeholder="Password" />
                        </InputGroup>
                        <InputGroup className="mb-4">
                            <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                            <Input type="password" placeholder="Repeat password" />
                        </InputGroup>
                        <Button color="success" block>Create Account</Button>
                    </CardBody>
                    <CardFooter className="p-4">
                        <Row>
                            <Col xs="12" sm="6">
                                <Button className="btn-facebook" block><span>facebook</span></Button>
                            </Col>
                            <Col xs="12" sm="6">
                                <Button className="btn-twitter" block><span>twitter</span></Button>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            </Col>
        );
    }
}