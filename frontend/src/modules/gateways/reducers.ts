import {
    GatewaysActionCreators,
    ReceiveGatewaysListActionPayload,
    SelectGatewayPayload
} from './actions';

import { createReducerBuilder } from 'lib';
import { IGatewaysState } from './state';

const reducerBuilder = createReducerBuilder<IGatewaysState>();

reducerBuilder.handleAsyncAction(GatewaysActionCreators.requestGatewaysList, {
    pending(state: IGatewaysState) {
        return {
            gateways: state.gateways || [],
            isLoading: true
        };
    },
    fulfilled(state: IGatewaysState, { result }: ReceiveGatewaysListActionPayload) {
        return {
            ...state,
            gateways: result,
            isLoading: false
        };
    }
});

reducerBuilder.handleAction(GatewaysActionCreators.selectGateway, (state: IGatewaysState, { gatewayId }: SelectGatewayPayload) => {
    return {
        ...state,
        selectedGateway: gatewayId
    };
});

export const GatewaysReducer = reducerBuilder.build({ gateways: [], isLoading: false });