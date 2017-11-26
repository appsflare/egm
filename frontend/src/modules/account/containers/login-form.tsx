
import { reduxForm } from 'redux-form';
import { LoginForm, ILoginFormData } from '../components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IAccountState } from '../state';

import { AccountActions } from '../actions';


const Form = reduxForm({ form: 'login' })(LoginForm);



export const LoginFormContainer = connect((state: { accounts: IAccountState }, props: any) => {
    const { accounts } = state;
    const { isLoggingIn, isLoggedIn } = accounts;
    return {
        isLoggingIn,
        isLoggedIn,
        ...props
    };
}, (dispatch) => {

    const { login } = bindActionCreators(AccountActions, dispatch);

    return {
        onSubmit(values: ILoginFormData) {            
            return login(values);
        }
    }

})(Form);



