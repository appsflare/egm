import {
    GatewaysActionCreators,
    ReceiveGatewaysListActionPayload
} from './actions';

import { createReducerBuilder } from 'lib';
import { GatewaysState } from './state';
import { Reducer } from 'redux';

const reducerBuilder = createReducerBuilder<GatewaysState>();


reducerBuilder.register(GatewaysActionCreators.requestingGatewayList.type, (state: GatewaysState) => {
    return {
        gateways: state.gateways || [],
        isLoading: true
    };
});

reducerBuilder.register(GatewaysActionCreators.receiveGatewayList.type, (state: GatewaysState, { gateways }: ReceiveGatewaysListActionPayload) => {
    debugger;
    return {
        ...state,
        gateways,
        isLoading: false
    };
});

export const GatewaysReducer: Reducer<GatewaysState> = reducerBuilder.build({ gateways: [], isLoading: false });
