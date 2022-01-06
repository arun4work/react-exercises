import {useState} from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [errorDetails, setErrorDetails] = useState(null);

    const addUserHandler = (event) => {
        event.preventDefault();

        if (
            enteredAge.trim().length === 0 ||
            enteredUsername.trim().length === 0
        ) {
            addErrorHandler({
                title: 'Invalid Entry',
                message: 'Please input username and age',
            });
            return;
        }

        if (+enteredAge < 1) {
            addErrorHandler({
                title: 'Invalid age',
                message: 'Please input valid age(>1)',
            });
            return;
        }

        const user = {
            username: enteredUsername,
            age: enteredAge,
            id: Math.random().toString(),
        };
        props.onAddUser(user);
        setEnteredAge('');
        setEnteredUsername('');
    };

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    };

    const addErrorHandler = (error) => {
        setErrorDetails(error);
    };

    const clearErrorHandler = () => {
        setErrorDetails(null);
    };

    return (
        <>
            {errorDetails && (
                <Modal
                    title={errorDetails.title}
                    message={errorDetails.message}
                    onClear={clearErrorHandler}
                />
            )}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor='username'>User Name</label>
                    <input
                        type='text'
                        id='username'
                        value={enteredUsername}
                        onChange={usernameChangeHandler}
                    />
                    <label htmlFor='age'>Age(Years)</label>
                    <input
                        type='number'
                        id='age'
                        value={enteredAge}
                        onChange={ageChangeHandler}
                    />
                    <Button type='submit'>Submit</Button>
                </form>
            </Card>
        </>
    );
};

export default AddUser;
