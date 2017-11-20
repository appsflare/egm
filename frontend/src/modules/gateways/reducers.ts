import {
    GatewaysActionCreators,
    ReceiveGatewaysListActionPayload
} from './actions';

import { createReducerBuilder } from 'lib';
import { GatewaysState } from './state';
import { Reducer } from 'redux';

const reducerBuilder = createReducerBuilder<GatewaysState>();


reducerBuilder.register(GatewaysActionCreators.requestingGatewayList, (state: GatewaysState) => {
    return {
        gateways: state.gateways,
        isLoading: true
    };
});

reducerBuilder.register(GatewaysActionCreators.receiveGatewayList, (state: GatewaysState, { gateways }: ReceiveGatewaysListActionPayload) => {
    return {
        ...state,
        gateways,
        isLoading: false
    };
});

export const reducer: Reducer<GatewaysState> = reducerBuilder.build({ gateways: [], isLoading: false });
