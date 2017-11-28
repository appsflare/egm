import { GatewayInfo } from "./state";
import { IAsyncResult, createAction, createAsyncAction } from "lib";

export interface RequestGatewaysListActionPayload {
    promise: Promise<ReceiveGatewaysListActionPayload>;
}

export interface ReceiveGatewaysListActionPayload extends IAsyncResult<GatewayInfo[]> {
}

export interface SelectGatewayPayload {
    gatewayId: string;
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
        };
    }),
    selectGateway: createAction('SELECT_GATEWAY', (args: SelectGatewayPayload) => args)
}

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const GatewaysActions = {
    requestGatewaysList: GatewaysActionCreators.requestGatewaysList.create,
    selectGateway: GatewaysActionCreators.selectGateway.create
};

export type GatewaysActionsType = typeof GatewaysActions;