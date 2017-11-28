import * as React from 'react';
import { GatewayForm } from '../components';
import { reduxForm } from 'redux-form';
import { Forms } from '../constants';

const Form = reduxForm({})(GatewayForm);

export function renderCreateGatewayForm() {
    return (<Form form={Forms.CreateGateway} />);
}

export function renderEditGatewayForm() {
    return (<Form form={Forms.EditGateway} />);
}
