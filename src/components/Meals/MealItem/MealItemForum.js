import { useRef, useState } from 'react';

import classes from './MealItemForum.module.css';
import Input from '../../UI/Input';

const MealItemForum = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredNumber = +enteredAmount;
        
        if (enteredAmount.trim().length === 0 || enteredNumber < 1) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredNumber);
    };

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input label="Amount" ref={amountInputRef} input={{
            id: 'amount_' + props.id,
            type: 'number',
            min: 1,
            step: 1,
            defaultValue: 1,
        }} />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount</p>}
    </form>;
};

export default MealItemForum;
