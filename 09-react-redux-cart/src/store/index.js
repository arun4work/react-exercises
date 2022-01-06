import {configureStore} from '@reduxjs/toolkit';
import productReducer from './product';
import cartReducer from './cart';
import uiReducer from './ui';

const store = configureStore({
    reducer: {product: productReducer, cart: cartReducer, ui: uiReducer},
});

export default store;
