import {useRef, useState, useContext} from 'react';
import useHttp from '../../hooks/use-http';
import {signUp, signIn} from '../../lib/api';
import AuthContext from '../../store/auth-context';
import {useHistory} from 'react-router-dom';

import classes from './AuthForm.module.css';

const AuthForm = () => {
    const history = useHistory();
    const [isLogin, setIsLogin] = useState(true);
    const emailRef = useRef();
    const passwordRef = useRef();
    const {isLoading, error, sendRequest} = useHttp();

    const authCtx = useContext(AuthContext);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        //validate enteredEmail and enteredPassword here

        const requestData = {
            email: enteredEmail,
            password: enteredPassword,
        };
        if (isLogin) {
            sendRequest(signIn, requestData, (data) => {
                //authCtx.logIn(data.idToken, data.expiresIn);
                const expirationTime = new Date(
                    new Date().getTime() + +data.expiresIn * 1000
                ).getTime();
                authCtx.logIn(data.idToken, expirationTime);
                history.replace('/');
            });
        } else {
            //sign up case here
            sendRequest(signUp, requestData, (data) => {
                const expirationTime = new Date(
                    new Date().getTime() + +data.expiresIn * 1000
                ).getTime();
                authCtx.logIn(data.idToken, expirationTime);
                history.replace('/');
            });
        }
    };

    return (
        <section className={classes.auth}>
            {isLoading && <p>Sending your request...</p>}
            {!isLoading && error && <p>{error}</p>}
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' ref={emailRef} required />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input
                        type='password'
                        id='password'
                        ref={passwordRef}
                        required
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    )}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? 'Create new account'
                            : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
