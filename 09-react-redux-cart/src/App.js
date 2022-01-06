import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import Notification from './components/UI/Notification';
import {sendCartData, fetchCartData} from './store/cart-action';

let isInitial = true;
function App() {
    const showCart = useSelector((state) => state.cart.showCart);
    const cartItems = useSelector((state) => state.cart.items);
    const notification = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    useEffect(() => {
        if (isInitial) {
            //should not make api call when empty cart for first time
            isInitial = false;
            return;
        }
        dispatch(sendCartData(cartItems));
    }, [cartItems, dispatch]);
    return (
        <React.Fragment>
            {notification && <Notification {...notification} />}
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </React.Fragment>
    );
}

export default App;
