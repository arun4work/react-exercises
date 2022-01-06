import {useContext, useEffect, useState} from 'react';
import CartIcon from './CartIcon';
import CartContext from '../../store/cart-context';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const ctx = useContext(CartContext);
    const [btnHighlighted, setBtnHighlighted] = useState(false);

    const {items} = ctx;
    const btnClass = `${classes.button} ${btnHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        setBtnHighlighted(true);

        const identifier = setTimeout(() => {
            setBtnHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(identifier);
        };
    }, [items]);

    const totalCartItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    return (
        <button className={btnClass} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Add To Cart</span>
            <span className={classes.badge}>{totalCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
