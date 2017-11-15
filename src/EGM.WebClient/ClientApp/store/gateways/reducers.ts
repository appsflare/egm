import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import {
    actions,
    RequestGatewaysListActionPayload,
    ReceiveGatewaysListActionPayload
} from './actions';

import { createReducerBuilder } from '../../lib';
import { GatewaysState } from './state';

const reducerBuilder = createReducerBuilder<GatewaysState>();

reducerBuilder.register(actions.requestingGatewayList, (state: GatewaysState, payload: RequestGatewaysListActionPayload) => {    
    return {
        gateways: state.gateways,
        isLoading: true
    };
});

reducerBuilder.register(actions.receiveGatewayList, (state: GatewaysState, { gateways }: ReceiveGatewaysListActionPayload) => {    
    return {
        gateways,
        isLoading: false
    };
});

export const reducer: Reducer<GatewaysState> = reducerBuilder.build({ gateways: [], isLoading: false });
