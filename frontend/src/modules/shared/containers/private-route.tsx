import * as React from 'react';
import { Redirect, RouteProps, RouteComponentProps, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IAccountState } from 'modules/account/state';
import { bindActionCreators } from 'redux';
import { AccountActions, AccountActionsType } from 'modules/account/actions';

function renderProtected(props: RouteProps & IAccountState & RouteComponentProps<{}> & AccountActionsType) {
    const { isLoggedIn, location, component } = props;

    console.log('curr loc: ', location.pathname);

    const render = (m: any) => {

        if (!isLoggedIn) {
            return (
                <Redirect exact to={{ pathname: '/app/account/login', state: { from: location.pathname } }} />
            );
        }

        if (props.component) {
            const Component = component as React.ComponentClass<RouteComponentProps<{}>>;
            return (<Component {...m} />);
        }
        if (props.render) {
            return props.render(m);
        }
        return <span>There is nothing to render!!</span>;
    }

    return (
        <Route { ...props} render={(matchProps) => render(matchProps)} />
    );
}

export const PrivateRoute = connect((state: { accounts: IAccountState }, props: any) => {
    const { accounts } = state;
    return { ...accounts, ...props }
}, (dispatch) => bindActionCreators(AccountActions, dispatch))(withRouter(renderProtected));