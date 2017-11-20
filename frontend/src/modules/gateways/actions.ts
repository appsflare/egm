import { GatewayInfo } from "states";
import { AsyncResult, createAction, createAsyncAction, createReceiveAsynAction } from "lib";

export interface RequestGatewaysListActionPayload {
    promise: Promise<ReceiveGatewaysListActionPayload>;
}

export interface ReceiveGatewaysListActionPayload {
    gateways: GatewayInfo[];
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
const actionCreators = {
    requestGatewaysList: createAsyncAction('REQUEST_GATEWAYSLIST', () => {
        return {
            promise: fetch(`api/gateways/list`)
                .then(response => response.json())
                .then(gateways => Promise.resolve({ gateways }))
        }
    }),
    requestingGatewayList: createAction('REQUEST_GATEWAYSLIST_PENDING', (args: RequestGatewaysListActionPayload) => args),
    receiveGatewayList: createReceiveAsynAction('REQUEST_GATEWAYSLIST_FULFILLED', (args: AsyncResult<GatewayInfo[]>) => args)
}

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const GatewaysActionCreators = {
    requestGatewaysList: actionCreators.requestGatewaysList.create,
    requestingGatewayList: actionCreators.requestingGatewayList.create,
    receiveGatewayList: actionCreators.receiveGatewayList.create
};

export type GatewaysActionCreatorsType = typeof GatewaysActionCreators;