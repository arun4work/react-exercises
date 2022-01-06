import {createSlice} from '@reduxjs/toolkit';

const initialCartState = {
    items: [],
    totalItems: 0,
    showCart: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const foundItem = state.items.find(
                (item) => item.id === newItem.id
            );
            state.totalItems += 1;
            if (!foundItem) {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    quantity: 1,
                    total: newItem.price,
                    price: newItem.price,
                });
            } else {
                foundItem.quantity += 1;
                foundItem.total += foundItem.price;
            }
        },
        removeFromCart: (state, action) => {
            //remove item from cart

            const foundItem = state.items.find(
                (state) => state.id === action.payload
            );
            if (!foundItem) {
                return;
            }
            state.totalItems -= 1;
            if (foundItem.quantity === 1) {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload
                );
            } else {
                foundItem.quantity -= 1;
                foundItem.total -= foundItem.price;
            }
        },
        toggleCart: (state) => {
            state.showCart = !state.showCart;
        },
        repalceCart: (state, action) => {
            state.items = action.payload || [];
            state.totalItems = state.items.reduce((prevVal, curVal) => {
                return prevVal + curVal.quantity;
            }, 0);
        },
    },
});

export const {addToCart, removeFromCart, toggleCart, repalceCart} =
    cartSlice.actions;
export default cartSlice.reducer;
