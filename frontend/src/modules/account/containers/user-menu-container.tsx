import { UserMenu } from '../components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IApplicationState } from '../state';
import { LoginActions } from '../actions';


export const UserMenuContainer = connect((state: IApplicationState, props: any) => {
    const { accounts: { login } } = state;
    return {
        ...login,
        ...props
    };
}, (dispatch) => bindActionCreators(LoginActions, dispatch))(UserMenu);