import {useSelector, useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../../store/cart';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const addToCartHandler = (item) => {
        dispatch(addToCart(item));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const cartItems = items.map((item) => {
        return (
            <CartItem
                key={item.id}
                onAdd={addToCartHandler.bind(null, item)}
                onRemove={removeFromCartHandler.bind(null, item.id)}
                item={{
                    title: item.title,
                    quantity: item.quantity,
                    total: item.total,
                    price: item.price,
                }}
            />
        );
    });

    return (
        <Card className={classes.cart}>
            <h2>Your Shopping Cart</h2>
            <ul>{cartItems}</ul>
        </Card>
    );
};

export default Cart;
