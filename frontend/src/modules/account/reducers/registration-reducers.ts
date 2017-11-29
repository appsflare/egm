import { createReducerBuilder } from 'lib';
import { IRegistrationState } from '../state';
import { RegistrationActionCreators } from '../actions';

export const registrationReducer = createReducerBuilder<IRegistrationState>()
    .handleAsyncAction(RegistrationActionCreators.register, {
        pending(state: IRegistrationState) {
            return {
                ...state,
                error: undefined,
                isInProgress: true,
                isSuccessful: false
            };
        },
        fulfilled(state: IRegistrationState) {
            return {
                ...state,
                error: undefined,
                isInProgress: false,
                isSuccessful: true
            };
        },
        rejected(state: IRegistrationState, { message }: Error) {
            return {
                ...state,
                error: message,
                isInProgress: false,
                isSuccessful: true
            };
        }
    })
    .build({ isInProgress: false, isSuccessful: false });