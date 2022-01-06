import {useSelector, useDispatch} from 'react-redux';
import {toggleCart} from '../../store/cart';

import classes from './CartButton.module.css';

const CartButton = (props) => {
    const totalItemsInCart = useSelector((state) => state.cart.totalItems);
    const dispatch = useDispatch();

    const toggleCartHandler = () => {
        if (totalItemsInCart === 0) {
            return;
        }
        dispatch(toggleCart());
    };

    return (
        <button className={classes.button} onClick={toggleCartHandler}>
            <span>My Cart</span>
            <span className={classes.badge}>{totalItemsInCart}</span>
        </button>
    );
};

export default CartButton;
