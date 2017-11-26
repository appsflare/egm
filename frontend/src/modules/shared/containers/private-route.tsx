import * as React from 'react';
import { Redirect, RouteProps, RouteComponentProps, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IAccountState } from 'modules/account/state';
import { bindActionCreators } from 'redux';
import { AccountActions } from 'modules/account/actions';

function renderProtected(props: RouteProps & IAccountState & RouteComponentProps<{}>) {
    const { isLoggedIn, location, component } = props;
    console.log('curr loc: ', location.pathname);

    const render = (m: any) => {
        if (props.component) {
            const Component = component as React.ComponentClass<RouteComponentProps<{}>>;
            return (<Component {...m} />);
        }
        if (props.render) {
            return props.render(m);
        }
        return null;
    }

    return (
        <Route { ...props} render={((matchProps) => (isLoggedIn ?
            render(matchProps) :
            <Redirect to={{ pathname: '/app/account/login', state: { from: location.pathname } }} />))} />
    );
}

export const PrivateRoute = connect((state: { accounts: IAccountState }, props: any) => {
    const { accounts } = state;
    return { ...accounts, ...props }
}, (dispatch) => bindActionCreators(AccountActions, dispatch))(withRouter(renderProtected));