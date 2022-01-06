import {createSlice} from '@reduxjs/toolkit';

const initialUIState = null;

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUIState,
    reducers: {
        showNotification: (state, action) => {
            return {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            };
        },
    },
});

export const {showNotification} = uiSlice.actions;
export default uiSlice.reducer;
