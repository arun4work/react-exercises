import React, {useContext, useState} from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../CommonUI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';

import classes from './Cart.module.css';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [checkOut, setIsCheckOut] = useState(false);
    const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
    const {sendRequest, isLoading, isError} = useHttp();

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        const updatedItem = {...item, amount: 1};
        cartCtx.addItem(updatedItem);
    };

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const orderHandler = () => {
        setIsCheckOut(true);
    };

    const checkOutHandler = async (userData) => {
        await sendRequest({
            url: 'https://react-http-b7eed-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: userData, order: cartCtx.items}),
        });
        setIsOrderSubmitted(true);
        cartCtx.resetCart();
    };

    const cartItems = (
        <ul>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    price={item.price}
                    amount={item.amount}
                    name={item.name}
                    onAdd={cartItemAddHandler.bind(null, item)}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    /*
                    bind item and item.id to cartItemAddHandler and cartItemRemoveHandler so that it will be available in future when executed, 
                    No need to pass the required parameters from child component while calling
                    */
                />
            ))}
        </ul>
    );

    const checkOutForm = (
        <React.Fragment>
            {' '}
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {checkOut && (
                <Checkout onClick={props.onHide} onCheckout={checkOutHandler} />
            )}
            {!checkOut && (
                <div className={classes.actions}>
                    <button
                        className={classes['button--alt']}
                        onClick={props.onHide}
                    >
                        Close
                    </button>
                    {hasItems && (
                        <button
                            className={classes.button}
                            onClick={orderHandler}
                        >
                            Order
                        </button>
                    )}
                </div>
            )}
        </React.Fragment>
    );

    const loadingContet = (
        <React.Fragment>
            <p>Placing your order...</p>
            <div className={classes.actions}>
                <button
                    className={classes['button--alt']}
                    onClick={props.onHide}
                >
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    const orderSubmittedContent = (
        <React.Fragment>
            {isOrderSubmitted && <p>Your order placed successfully.</p>}
            <div className={classes.actions}>
                <button
                    className={classes['button--alt']}
                    onClick={props.onHide}
                >
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal onHide={props.onHide}>
            {isLoading && loadingContet}
            {isOrderSubmitted && !isLoading && orderSubmittedContent}
            {!isLoading && !isOrderSubmitted && checkOutForm}
        </Modal>
    );
};

export default Cart;
