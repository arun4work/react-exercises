import {createSlice} from '@reduxjs/toolkit';

// Initial auth state
const initialAuthState = {isLoggedIn: false};

/**
 * create auth state and related reduceres with createSlice
 * - name: name of the auth slice
 * - initialState: intial state to initialize the state
 * - reducers: {set of actions to update the state based on user action}
 */
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
    },
});

// Action creators are generated for auth reducer function
export const {login, logout} = authSlice.actions;

//export auth reducer to configure store
export default authSlice.reducer;
