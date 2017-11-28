import { Reducer } from 'redux';
import { PayloadAction } from 'react-redux-typescript';

export interface IAsyncPayload<TResult> {
    promise: Promise<TResult>;
    data?: any
}

export interface IAsyncResult<TResult> {
    result: TResult;
};

export type IActionPayloadFactory<TParam, TPayload> = (args: TParam) => TPayload;

export interface IActionPayloadCreatorWithParam<TType extends string, TPayload, TParam> {
    type: TType;
    create: IActionPayloadFactory<TParam, TPayload>;
}

export interface IActionCreatorWithParam<TType extends string, TPayload, TParam> {
    type: TType;
    create: (args?: TParam) => PayloadAction<TType, TPayload>;
}

class ActionFactoryImpl<TType extends string, TPayload, TParam> implements IActionCreatorWithParam<TType, TPayload, TParam>{
    create: (args: TParam | undefined) => PayloadAction<TType, TPayload> = (args: TParam) => {
        return {
            type: this.type,
            payload: this.payloadFactory(args)
        };
    };

    constructor(public readonly type: TType,
        private readonly payloadFactory: IActionPayloadFactory<TParam, TPayload>) { }

}

export function createAction<TType extends string, TParam, TPayload>(type: TType, payloadFactory: IActionPayloadFactory<TParam, TPayload>)
    : IActionCreatorWithParam<TType, TPayload, TParam> {

    return new ActionFactoryImpl(type, payloadFactory)
}

export function createAsyncAction<TType extends string,
    TParam,
    TResult,
    TPayload extends IAsyncPayload<TResult>>(type: TType, payloadFactory: IActionPayloadFactory<TParam, TPayload>)
    : IActionCreatorWithParam<TType, TPayload, TParam> {

    return new ActionFactoryImpl(type, payloadFactory)
}

export function createReceiveAsynAction<TType extends string,
    TParam, TResult,
    TPayload extends IAsyncResult<TResult>>(type: TType, payloadFactory: IActionPayloadFactory<TParam, TPayload>)
    : IActionCreatorWithParam<TType, TPayload, TParam> {

    return new ActionFactoryImpl(type, payloadFactory)
}


export type ActionHandlerType<TState, TPayload> = (state: TState, payload: TPayload) => TState;
export interface AsyncActionHandlers<TState, TPayload extends IAsyncPayload<TResult>, TResult extends IAsyncResult<TResult>> {
    pending: ActionHandlerType<TState, TPayload>;
    fulfilled: ActionHandlerType<TState, TResult>;
    rejected: ActionHandlerType<TState, Error>;
}

export function createReducerBuilder<TState>() {

    const handlers = new Map<any, ActionHandlerType<TState, any>>();


    return {
        handleAction<TType extends string, TPayload, TParam>(
            actionDef: IActionCreatorWithParam<TType, TPayload, TParam>,
            handler: ActionHandlerType<TState, TPayload>
        ) {
            handlers.set(actionDef.type, handler);
            return this;
        },

        handleActions<TType extends string, TPayload, TParam>(
            actionDefs: IActionCreatorWithParam<TType, TPayload, TParam>[],
            handler: ActionHandlerType<TState, TPayload>
        ) {
            actionDefs.forEach(a => this.handleAction(a, handler));
            return this;
        },

        handleAsyncAction<TType extends string, TPayload extends IAsyncPayload<TResult>, TResult extends IAsyncResult<TResult>, TParam>(
            actionDef: IActionCreatorWithParam<TType, TPayload, TParam>,
            stateHandlers: Partial<AsyncActionHandlers<TState, TPayload, TResult>>
        ) {
            stateHandlers.pending && handlers.set(`${actionDef.type}_PENDING`, stateHandlers.pending);
            stateHandlers.fulfilled && handlers.set(`${actionDef.type}_FULFILLED`, stateHandlers.fulfilled);
            stateHandlers.rejected && handlers.set(`${actionDef.type}_REJECTED`, stateHandlers.rejected);
            return this;
        },

        handleAsyncActions<TType extends string, TPayload extends IAsyncPayload<TResult>, TResult extends IAsyncResult<TResult>, TParam>(
            actionDefs: IActionCreatorWithParam<TType, TPayload, TParam>[],
            stateHandlers: Partial<AsyncActionHandlers<TState, TPayload, TResult>>
        ) {
            actionDefs.forEach(ac => this.handleAsyncAction(ac, stateHandlers))
            return this;
        },


        build(initialState?: TState): Reducer<TState> {
            return (state: TState, action: any | PayloadAction<any, any>) => {

                const finalState = state || initialState
                const handler = handlers.get(action.type);

                return handler ? handler(finalState, action.payload) : finalState;
            };
        }
    }
}