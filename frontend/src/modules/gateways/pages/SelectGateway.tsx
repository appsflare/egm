import * as React from 'react';
import { connect } from 'react-redux';

import { GatewaysState, GatewaysActionCreators } from 'modules/gateways/actions';
import { bindActionCreators } from 'redux';
import { SelectGateway } from '../components'

export const SelectGatewayPage = connect(
    (state: any, props: any) => { return { ...props, ...state.gateways } }, // Selects which state properties are merged into the component's props
    (dispatch) => bindActionCreators(GatewaysActionCreators, dispatch)           // Selects which action creators are merged into the component's props
)(SelectGateway);
