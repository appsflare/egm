import { GatewayInfo } from "./state";
import { fetch } from 'domain-task';
import { createAction } from "../../lib";


export interface RequestGatewaysListActionPayload {
    promise: Promise<ReceiveGatewaysListActionPayload>;
}

export interface ReceiveGatewaysListActionPayload {
    gateways: GatewayInfo[];
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export const actions = {
    requestGatewayList: 'REQUEST_GATEWAYSLIST',
    requestingGatewayList: 'REQUEST_GATEWAYSLIST_PENDING',
    receiveGatewayList: 'REQUEST_GATEWAYSLIST_FULFILLED',
}

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestGatewaysList() {
        const action = createAction<RequestGatewaysListActionPayload>(actions.requestGatewayList);
        return action({
            promise: fetch(`api/gateways/list`)
                .then(response => response.json())
                .then(gateways => Promise.resolve({ gateways }))
        });
    }
};

export type ActionCreatorsType = typeof actionCreators;