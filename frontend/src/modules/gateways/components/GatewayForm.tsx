import * as React from 'react';
import { Form, Field, InjectedFormProps } from 'redux-form';
import { Col, FormGroup, Label, Input, Row } from 'reactstrap';

export interface IGatewayFormData {
    name: string;
    adminApi: string;
    adminUsername: string;
    adminPassword: string;
}

function renderField(field: any) {
    return (
        <FormGroup>
            <Label for={field.name}>{field.label}</Label>
            <Input type={field.type} name={field.name} placeholder={field.label} />
        </FormGroup>
    );
}

export class GatewayForm extends React.Component<InjectedFormProps<IGatewayFormData>> {

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <Row>
                    <Col sm="6" xs="12">
                        <Field name="name" type="text" label="Gateway Name" component={renderField} />
                    </Col>
                </Row>
                <Row>
                    <Col xs="4">
                        <Field name="adminApi" type="url" label="Admin API Url" component={renderField} />
                    </Col>
                    <Col xs="4">
                        <Field name="adminUsername" type="text" label="Admin Username" component={renderField} />
                    </Col>
                    <Col xs="4">
                        <Field name="adminPassword" type="password" label="Admin Password" component={renderField} />
                    </Col>
                </Row>
            </Form>
        );
    }
}

