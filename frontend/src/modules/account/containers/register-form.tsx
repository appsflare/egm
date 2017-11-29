
import { reduxForm } from 'redux-form';
import { RegisterForm, IRegisterFormData } from '../components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IApplicationState } from '../state';
import { RegistrationActions } from '../actions';

const messages: any = {
    'taken': 'Email already exists',
    'invalid': 'Email provided is not invalid'
};

const Form = reduxForm({
    form: 'register', asyncBlurFields: ['email'],
    asyncValidate(values: any) {
        return fetch('/account/validate/email', {
            body: JSON.stringify({ email: values.email }),
            method: 'POST',
            headers: [["content-type", "application/json"]]
        })
            .then(r => r.json())
            .then(r => {
                if (!r.result) {
                    throw { email: messages[r.error] }
                }
            });
    },
    validate(values: IRegisterFormData) {

        const errors: any = {}
        if (!values.email) {
            errors.email = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
        }

        if (values.confirmPassword && values.password && values.confirmPassword != values.password) {
            errors.confirmPassword = `Confirm passwoord doesn't match password`;
        }
        return errors;

    },


})(RegisterForm);

export const RegisterFormContainer = connect((state: IApplicationState, props: any) => {
    const { accounts: { registration: { isInProgress, isSuccessful } } } = state;

    return {
        isInProgress,
        isSuccessful,
        ...props
    };
}, (dispatch) => {
    const { register } = bindActionCreators(RegistrationActions, dispatch);
    return {
        onSubmit(values: IRegisterFormData) {
            return register(values);
        }
    };
})(Form);
