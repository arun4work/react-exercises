import React, {useState, useReducer, useEffect, useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/InputElement/Input';

const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT_EMAIL') {
        return {value: action.payload, isValid: action.payload.includes('@')};
    }

    if (action.type === 'EMAIL_ON_BLUR') {
        return {value: state.value, isValid: state.isValid};
    }
    return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {
    if (action.type === 'PASSWORD_INPUT') {
        return {
            value: action.payload,
            isValid: action.payload.trim().length > 6,
        };
    }

    if (action.type === 'PASSWORD_ON_BLUR') {
        return {value: state.value, isValid: state.isValid};
    }
    return {value: '', isValid: false};
};

const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmailState] = useReducer(emailReducer, {
        value: '',
        isValid: null,
    });

    const [passwordState, dispatchPassState] = useReducer(passwordReducer, {
        value: '',
        isValid: null,
    });

    const {isValid: isEmailValid} = emailState;
    const {isValid: isPasswordValid} = passwordState;

    const ctx = useContext(AuthContext);

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking validity');
            setFormIsValid(isEmailValid && isPasswordValid);
        }, 500);
        return () => {
            console.log('CLEAN UP');
            clearInterval(identifier);
        };
    }, [isEmailValid, isPasswordValid]);

    const emailChangeHandler = (event) => {
        //setEnteredEmail(event.target.value);
        dispatchEmailState({
            type: 'USER_INPUT_EMAIL',
            payload: event.target.value,
        });
        setFormIsValid(
            emailState.value.includes('@') &&
                passwordState.value.trim().length > 6
        );
    };

    const passwordChangeHandler = (event) => {
        dispatchPassState({
            type: 'PASSWORD_INPUT',
            payload: event.target.value,
        });
        //setEnteredPassword(event.target.value);
        setFormIsValid(
            emailState.value.includes('@') &&
                event.target.value.trim().length > 6
        );
    };

    const validateEmailHandler = () => {
        // setEmailIsValid(enteredEmail.includes('@'));
        dispatchEmailState({
            type: 'EMAIL_ON_BLUR',
        });
    };

    const validatePasswordHandler = () => {
        //setPasswordIsValid(enteredPassword.trim().length > 6);
        dispatchPassState({type: 'PASSWORD_ON_BLUR'});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        ctx.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    type={'email'}
                    id={'email'}
                    value={emailState.value}
                    isValid={emailState.isValid}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                >
                    E-Mail
                </Input>
                {/* <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor='email'>E-Mail</label>
                    <input
                        type='email'
                        id='email'
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div> */}
                <Input
                    type='password'
                    id='password'
                    value={passwordState.value}
                    isValid={passwordState.isValid}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                >
                    Password
                </Input>

                {/* <div
                    className={`${classes.control} ${
                        passwordState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div> */}
                <div className={classes.actions}>
                    <Button
                        type='submit'
                        className={classes.btn}
                        disabled={!formIsValid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
