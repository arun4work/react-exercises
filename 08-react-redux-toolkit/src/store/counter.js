import {createSlice} from '@reduxjs/toolkit';

//Initial counter state
const initialCounterState = {
    counter: 0,
    isShow: true,
};

/**
 * create counter state and related reduceres with createSlice
 * - name: name of the slice
 * - initialState: intial state to initialize the state
 * - reducers: {set of actions to update the state based on user action}
 */
const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment: (state) => {
            state.counter += 1;
        },
        decrement: (state) => {
            state.counter -= 1;
        },
        toggleCounter: (state) => {
            state.isShow = !state.isShow;
        },
    },
});

// Action creators are generated for counter reducer function
export const {increment, decrement, toggleCounter} = counterSlice.actions;

//export counter reducer to configure store
export default counterSlice.reducer;
