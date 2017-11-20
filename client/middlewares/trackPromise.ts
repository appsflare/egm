import { ActionWithPayload } from '../lib';
import { addTask } from 'domain-task';
import { Dispatch, MiddlewareAPI } from 'redux';


export default function isPromise(value: any) {
    if (value !== null && typeof value === 'object') {
        return value && typeof value.then === 'function';
    }

    return false;
}


export const trackPromise = <S>(api: MiddlewareAPI<S>) =>
    (next: Dispatch<S>) =>
        (action: any): any => {

            if (action.payload) {

                let promise = isPromise(action.payload) ?
                    action.payload : isPromise(action.payload.promise) ?
                        action.payload.promise : undefined;

                if (promise) {
                    addTask(promise);
                }
            }
            return next(action);
        }
