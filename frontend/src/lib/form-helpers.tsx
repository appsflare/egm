import * as React from 'react';
import { Input, FormField, Message } from "semantic-ui-react";

export function renderField(icon: string) {
    return function ({ className, input, label, type, value, meta: { asyncValidating, touched, error } }: any) {
        const isInvalid = touched && error;

        const finalClass = `${className || ''}`;
        return (
            <FormField>
                <Input fluid icon={icon} loading={asyncValidating} className={finalClass}
                    iconPosition="left" {...input}
                    type={type} placeholder={label} 
                    error={isInvalid} defaultValue={value}
                />
                <Message size="mini" floating visible={isInvalid} error>{error}</Message>
            </FormField>
        );
    };
}   