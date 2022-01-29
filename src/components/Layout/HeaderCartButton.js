import { useContext, useEffect, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [btnActive, setBtnActive] = useState(false);
    const cartContext = useContext(CartContext);
    const { items } = cartContext;

    const numberOfCartItems = items.reduce((current, item) => {
        return current + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnActive ? classes.bump : ''}`;

    useEffect(() => {
        if (cartContext.items.length === 0) {
            return;
        }

        setBtnActive(true);

        const timer = setTimeout(() => {
            setBtnActive(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>;
};

export default HeaderCartButton;
