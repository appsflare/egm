import * as React from 'react';
import { Form, Field, InjectedFormProps } from 'redux-form';
import { FormGroup, Label, Input, Segment } from 'semantic-ui-react';

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

                <Segment>
                    <Field name="name" type="text" label="Gateway Name" component={renderField} />

                    <Field name="adminApi" type="url" label="Admin API Url" component={renderField} />

                    <Field name="adminUsername" type="text" label="Admin Username" component={renderField} />

                    <Field name="adminPassword" type="password" label="Admin Password" component={renderField} />
                </Segment>

            </Form>
        );
    }
}

