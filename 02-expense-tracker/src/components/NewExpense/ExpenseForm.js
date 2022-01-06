import {useState} from 'react';
import './ExpenseForm.css';

const ExpenseForm = (props) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    const amountChangeHandler = (event) => {
        setAmount(event.target.value);
    };

    const dateChangeHandler = (event) => {
        setDate(event.target.value);
    };

    const sumbitHandler = (event) => {
        event.preventDefault();
        const expenseData = {
            title,
            amount: +amount,
            date: new Date(date),
        };
        props.onSaveExpenseData(expenseData);
        setTitle('');
        setDate('');
        setAmount('');
    };

    return (
        <form onSubmit={sumbitHandler}>
            <div className='new-expense__contorls'>
                <div className='new-expense__control'>
                    <label>Title</label>
                    <input
                        type='text'
                        value={title}
                        onChange={titleChangeHandler}
                    />
                </div>

                <div className='new-expense__control'>
                    <label>Amount</label>
                    <input
                        type='number'
                        value={amount}
                        min='0.01'
                        step='0.01'
                        onChange={amountChangeHandler}
                    />
                </div>

                <div className='new-expense__control'>
                    <label>Date</label>
                    <input
                        type='date'
                        value={date}
                        min='2019-01-01'
                        max='2022-12-31'
                        onChange={dateChangeHandler}
                    />
                </div>
            </div>

            <div className='new-expense__actions'>
                <button type='text' onClick={props.onCancel}>
                    Cancel
                </button>
                <button type='sumbit'>Add Expense</button>
            </div>
        </form>
    );
};

export default ExpenseForm;
