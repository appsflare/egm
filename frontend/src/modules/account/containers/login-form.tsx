
import { reduxForm } from 'redux-form';
import { LoginForm, ILoginFormData } from '../components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IApplicationState } from '../state';
import { LoginActions } from '../actions';

const Form = reduxForm({ form: 'login' })(LoginForm);

export const LoginFormContainer = connect((state: IApplicationState, props: any) => {

    const { accounts: { login: { isLoggingIn, isLoggedIn } } } = state;

    return {
        isLoggingIn,
        isLoggedIn,
        ...props
    };
}, (dispatch) => {

    const { login } = bindActionCreators(LoginActions, dispatch);

    return {
        onSubmit(values: ILoginFormData) {
            return login(values);
        }
    }

})(Form);



