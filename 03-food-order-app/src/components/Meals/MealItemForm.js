import {useRef, useState} from 'react';
import Input from '../CommonUI/Input';
import classes from './MealItemForm.module.css';
const MealItemForm = (props) => {
    const [validAmount, setValidAmount] = useState(true);
    const inputRef = useRef();
    const onSubmitHandler = (event) => {
        event.preventDefault();

        const updatedAmount = +inputRef.current.value;
        if (updatedAmount === 0 || updatedAmount < 1 || updatedAmount > 5) {
            setValidAmount(false);
            return;
        }
        props.onAddToCart(updatedAmount);
    };
    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <Input
                label={'Amount'}
                ref={inputRef}
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1',
                }}
            />
            <button>+ Add</button>
            {!validAmount && <p>Please enter valid amount(1-5).</p>}
        </form>
    );
};

export default MealItemForm;
