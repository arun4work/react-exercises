import {createSlice} from '@reduxjs/toolkit';

const initialProductState = {
    products: [
        {
            id: 'p1',
            title: 'React complete guide',
            price: 6,
            description: 'This is my first book - amazing!',
        },
        {
            id: 'p2',
            title: 'Node complete course',
            price: 13,
            description: 'This is my second course!',
        },
    ],
};

const productSlice = createSlice({
    name: 'product',
    initialState: initialProductState,
    reducers: {
        add: (state, action) => {
            state.push(action.payload);
        },
        remove: (state, action) => {
            //remove product by id
        },
    },
});

export const {add, remove} = productSlice.actions;
export default productSlice.reducer;
