import {useReducer} from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_CART_ITEM') {
        const updatedTotalAmount =
            state.totalAmount + action.payload.price * action.payload.amount;

        const foundItemIndex = state.items.findIndex(
            (item) => item.id === action.payload.id
        );

        let updatedItems;
        let existingItem = state.items[foundItemIndex];

        if (existingItem) {
            let updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.payload.amount,
            };
            updatedItems = [...state.items];
            updatedItems[foundItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.payload);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === 'REMOVE_CART_ITEM') {
        const foundItemIndex = state.items.findIndex(
            (item) => item.id === action.payload
        );

        let existingItem = state.items[foundItemIndex];

        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems = [...state.items];

        if (existingItem) {
            const updatedAmount = existingItem.amount - 1;

            if (updatedAmount > 0) {
                const updatedItem = {...existingItem, amount: updatedAmount};
                updatedItems[foundItemIndex] = updatedItem;
            } else {
                updatedItems.splice(foundItemIndex, 1);
            }
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === 'RESET_CART') {
        return defaultCartState;
    }

    return defaultCartState;
};

const CartContextProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD_CART_ITEM', payload: item});
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE_CART_ITEM', payload: id});
    };

    const resetCart = () => {
        dispatchCartAction({type: 'RESET_CART'});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        resetCart: resetCart,
    };
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
