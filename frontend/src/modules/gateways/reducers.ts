import {
    GatewaysActionCreators,
    ReceiveGatewaysListActionPayload,
    SelectGatewayPayload
} from './actions';

import { createReducerBuilder } from 'lib';
import { GatewaysState } from './state';

const reducerBuilder = createReducerBuilder<GatewaysState>();

reducerBuilder.register(GatewaysActionCreators.requestingGatewayList, (state: GatewaysState) => {
    return {
        gateways: state.gateways || [],
        isLoading: true
    };
});

reducerBuilder.register(GatewaysActionCreators.receiveGatewayList, (state: GatewaysState, { result }: ReceiveGatewaysListActionPayload) => {
    return {
        ...state,
        gateways: result,
        isLoading: false
    };
});

reducerBuilder.register(GatewaysActionCreators.selectGateway, (state: GatewaysState, { gatewayId }: SelectGatewayPayload) => {
    return {
        ...state,
        selectedGateway: gatewayId
    };
});

export const GatewaysReducer = reducerBuilder.build({ gateways: [], isLoading: false });