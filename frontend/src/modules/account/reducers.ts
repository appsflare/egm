import { createReducerBuilder } from 'lib';
import { IAccountState } from 'modules/account/state';

const builder = createReducerBuilder<IAccountState>();
export default builder.build({ isLoggedIn: false, isLoggingIn: false });