import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { GatewaysState, actionCreators, ActionCreatorsType } from '../store/gateways';
import { bindActionCreators } from 'redux';
import { SelectGateway } from '../components'

export const SelectGatewayPage = connect(
    (state: ApplicationState, props: any) => { return { ...props, ...state.gateways } }, // Selects which state properties are merged into the component's props
    (dispatch) => bindActionCreators(actionCreators, dispatch)           // Selects which action creators are merged into the component's props
)(SelectGateway);
