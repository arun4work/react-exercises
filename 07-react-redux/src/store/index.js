/**sdfsf
 * @info import createStore and combineReducers from redux
 */

import {createStore, combineReducers} from 'redux';

//Initial counter state
const initialCounterState = {
    counter: 0,
};

//counterReducer with default state as initialCounterState
const counterReducer = (state = initialCounterState, action) => {
    if (action.type === 'increment') {
        return {counter: state.counter + 1};
    }

    if (action.type === 'decrement') {
        return {counter: state.counter - 1};
    }

    return state;
};

//intial Auth state
const initialAuthState = {isLoggedIn: false};

//create Auth reducer with initialAuthState as default state
const authReducer = (state = initialAuthState, action) => {
    if (action.type === 'login') {
        return {isLoggedIn: true};
    }

    if (action.type === 'logout') {
        return {isLoggedIn: false};
    }

    return state;
};

//for single reducer, just pass the reducer function while createing store
// const store = createStore(counterReducer)

//for multiple reducers, we need to combine all reducers and then pass to createStore functiona as below.
//each sliced store can be asses through state.counter or state.auth
const store = createStore(
    combineReducers({counter: counterReducer, auth: authReducer})
);

export default store;
