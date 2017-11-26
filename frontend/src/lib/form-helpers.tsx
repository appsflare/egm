import * as React from 'react';
import { FormGroup, InputGroupAddon, InputGroup, Input, Alert } from "reactstrap";

export function renderFieldGroup(icon: string) {
    return function ({ className, input, label, type, value, meta: { asyncValidating, touched, error } }: any) {
        const isInvalid = touched && error;

        const finalClass = `${className || ''} ${asyncValidating && 'async-validating'}`.trim();
        return (
            <FormGroup>
                <InputGroup className={finalClass}>
                    <InputGroupAddon><i className={icon}></i></InputGroupAddon>
                    <Input {...input} type={type} placeholder={label} valid={!isInvalid} defaultValue={value} />
                </InputGroup>
                {(isInvalid) ? (<Alert className="feedback-alert" color="danger">{error}</Alert>) : null}
            </FormGroup>
        );
    };
}   