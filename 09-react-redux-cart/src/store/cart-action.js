import {showNotification} from './ui';
import {repalceCart} from './cart';

const request = async (dispatch, config, callback) => {
    dispatch(
        showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!',
        })
    );

    const sendRequest = async () => {
        const response = await fetch(config.url, {
            method: config.method || 'GET',
            body: config.body ? JSON.stringify(config.body) : null,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('something went wrong!');
        }
        const res = await response.json();
        callback(res);
    };

    try {
        await sendRequest();
        dispatch(
            showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!',
            })
        );
    } catch (err) {
        dispatch(
            showNotification({
                status: 'error',
                title: 'Error',
                message: 'Sending cart data failed!',
            })
        );
    }
};

export const sendCartData = (cartData) => {
    return async (dispatch) => {
        await request(
            dispatch,
            {
                url: 'https://react-http-b7eed-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
                method: 'PUT',
                body: cartData,
            },
            (data) => {}
        );
    };
};

export const fetchCartData = () => {
    return async (dispatch) => {
        request(
            dispatch,
            {
                url: 'https://react-http-b7eed-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
            },
            (data) => {
                dispatch(repalceCart(data));
            }
        );
    };
};
