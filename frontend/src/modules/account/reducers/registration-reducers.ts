import { createReducerBuilder } from 'lib';
import { IRegistrationState } from '../state';

export const registrationReducer = createReducerBuilder<IRegistrationState>()
    .build({ isInProgress: false, isSuccessful: false });