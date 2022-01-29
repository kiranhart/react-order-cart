import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cardReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updatedTotal = state.totalAmount + action.item.price * action.item.amount; 

        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotal
        };
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];

        const updatedTotal = state.totalAmount - existingCartItem.price;
        let updatedItems;
        
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updatedItem ={...existingCartItem, amount: existingCartItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotal
        };
    }

    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cardReducer, defaultCartState);

    const addItemToCartHander = (item) => {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item
        });
    };

    const removeItemFromCart = (id) => {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id
        });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHander,
        removeItem: removeItemFromCart
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>;
};

export default CartProvider;