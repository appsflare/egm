import { connect } from 'react-redux';
import { GatewaysActions } from 'modules/gateways/actions';
import { bindActionCreators } from 'redux';
import { GatewaySelector } from '../components'

export const SelectGatewayPage = connect(
    (state: any, props: any) => {        
        return { ...props, ...state.gateways }
    }, // Selects which state properties are merged into the component's props
    (dispatch) => bindActionCreators(GatewaysActions, dispatch)           // Selects which action creators are merged into the component's props
)(GatewaySelector);
