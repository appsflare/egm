import { Reducer, Action, ActionCreator } from 'redux';
import { Dispatch } from 'react-redux';

export type ActionCreatorWithPayload<TPayload> = (payload: TPayload) => ActionWithPayload<TPayload>;

export interface ActionWithPayload<TPayload> extends Action {
    payload: TPayload;
}

export function createAction<TPayload>(type: string): ActionCreatorWithPayload<TPayload> {
    return function (payload: TPayload) {
        return {
            type,
            payload
        };
    }
}

export type ActionHandlerType<TState, TPayload> = (state: TState, payload: TPayload) => TState;

export function createReducerBuilder<TState>() {

    const handlers = new Map<any, ActionHandlerType<TState, any>>();

    return {
        register<TPayload>(actionType: any, handler: ActionHandlerType<TState, TPayload>) {
            handlers.set(actionType, handler);
        },
        build(initialState?: TState): Reducer<TState> {
            return (state: TState, action: any | ActionCreatorWithPayload<any>) => {

                const finalState = state || initialState
                const handler = handlers.get(action.type);

                return handler ? handler(finalState, action.payload) : finalState;
            }
        }
    }
}