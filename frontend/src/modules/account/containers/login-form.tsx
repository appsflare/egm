
import { reduxForm } from 'redux-form';
import { LoginForm } from '../components';


export const LoginFormContainer = reduxForm({})(LoginForm);



