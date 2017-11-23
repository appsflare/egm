import { GatewayInfo } from "./state";
import { AsyncResult, createAction, createAsyncAction, createReceiveAsynAction } from "lib";

export interface RequestGatewaysListActionPayload {
    promise: Promise<ReceiveGatewaysListActionPayload>;
}

export interface ReceiveGatewaysListActionPayload extends AsyncResult<GatewayInfo[]> {    
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
export const GatewaysActionCreators = {
    requestGatewaysList: createAsyncAction('REQUEST_GATEWAYSLIST', () => {
        return {
            promise: fetch(`/api/gateways`)
                .then(response => response.json())
                .then(result => Promise.resolve({ result }))
        }
    }),
    requestingGatewayList: createAction('REQUEST_GATEWAYSLIST_PENDING', (args: RequestGatewaysListActionPayload) => args),
    receiveGatewayList: createReceiveAsynAction('REQUEST_GATEWAYSLIST_FULFILLED', (args: ReceiveGatewaysListActionPayload) => args)
}

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const GatewaysActions = {
    requestGatewaysList: GatewaysActionCreators.requestGatewaysList.create,
    requestingGatewayList: GatewaysActionCreators.requestingGatewayList.create,
    receiveGatewayList: GatewaysActionCreators.receiveGatewayList.create
};

export type GatewaysActionsType = typeof GatewaysActions;