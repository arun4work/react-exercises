// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

import {configureStore} from '@reduxjs/toolkit';

import counterReducer from './counter';
import authReducer from './auth';

/** configure the store  with multiple module related reducers */
const store = configureStore({
    reducer: {counter: counterReducer, auth: authReducer},
});
export default store;
