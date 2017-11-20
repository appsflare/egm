import {
    actions,
    ReceiveGatewaysListActionPayload
} from 'actions';

import { createReducerBuilder } from 'lib';
import { GatewaysState } from 'types';
import { Reducer } from 'redux';

const reducerBuilder = createReducerBuilder<GatewaysState>();


reducerBuilder.register(actions.requestingGatewayList, (state: GatewaysState) => {
    return {
        gateways: state.gateways,
        isLoading: true
    };
});

reducerBuilder.register(actions.receiveGatewayList, (state: GatewaysState, { gateways }: ReceiveGatewaysListActionPayload) => {
    return {
        ...state,
        gateways,
        isLoading: false
    };
});

export const reducer: Reducer<GatewaysState> = reducerBuilder.build({ gateways: [], isLoading: false });
