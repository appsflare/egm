import { Reducer, Action } from 'redux';
import { PayloadAction, ActionCreator, ActionCreatorFunction } from 'react-redux-typescript';
import { Dispatch } from 'react-redux';
import { createFactory } from 'react';

export interface AsyncPayload<TResult> {
    promise: Promise<TResult>;
    meta?: any
};

export interface AsyncResult<TResult> {
    value: TResult;
};

export type ActionPayloadFactory<TParam, TPayload> = (args: TParam) => TPayload;

export interface ActionCreatorWithParam<TType extends string, TPayload, TParam> {
    type: TType;
    create: (args: TParam) => PayloadAction<TType, TPayload>;
}

class ActionFactoryImpl<TType extends string, TPayload, TParam> implements ActionCreatorWithParam<TType, TPayload, TParam>{
    create: (args: TParam | undefined) => PayloadAction<TType, TPayload> = (args: TParam) => {
        return {
            type: this.type,
            payload: this.payloadFactory(args)
        }
    };


    constructor(public readonly type: TType,
        private readonly payloadFactory: ActionPayloadFactory<TParam, TPayload>) { }

}


export function createAction<TType extends string, TParam, TPayload>(type: TType, payloadFactory: ActionPayloadFactory<TParam, TPayload>)
    : ActionCreatorWithParam<TType, TPayload, TParam> {

    return new ActionFactoryImpl(type, payloadFactory)
}


export function createAsyncAction<TType extends string, TParam, TResult, TPayload extends AsyncPayload<TResult>>(type: TType, payloadFactory: ActionPayloadFactory<TParam, TPayload>)
    : ActionCreatorWithParam<TType, TPayload, TParam> {

    return new ActionFactoryImpl(type, payloadFactory)
}


export function createReceiveAsynAction<TType extends string, TParam, TResult, TPayload extends AsyncResult<TResult>>(type: TType, payloadFactory: ActionPayloadFactory<TParam, TPayload>)
    : ActionCreatorWithParam<TType, TPayload, TParam> {

    return new ActionFactoryImpl(type, payloadFactory)
}



export type ActionHandlerType<TState, TPayload> = (state: TState, payload: TPayload) => TState;

export function createReducerBuilder<TState>() {

    const handlers = new Map<any, ActionHandlerType<TState, any>>();

    return {
        register<TPayload>(actionType: any, handler: ActionHandlerType<TState, TPayload>) {
            handlers.set(actionType, handler);
        },
        build(initialState?: TState): Reducer<TState> {
            return (state: TState, action: any | PayloadAction<any, any>) => {

                const finalState = state || initialState
                const handler = handlers.get(action.type);

                return handler ? handler(finalState, action.payload) : finalState;
            }
        }
    }
}