import React from 'react';
import {useDispatch} from 'react-redux';
import classes from './Auth.module.css';

const Auth = () => {
    const login = useDispatch();

    const authSubmitHandler = (e) => {
        e.preventDefault();
        login({type: 'login'});
    };

    return (
        <React.Fragment>
            <main className={classes.auth}>
                <section>
                    <form onSubmit={authSubmitHandler}>
                        <div className={classes.control}>
                            <label htmlFor='email'>Email</label>
                            <input type='email' id='email' />
                        </div>
                        <div className={classes.control}>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' />
                        </div>
                        <button>Login</button>
                    </form>
                </section>
            </main>
        </React.Fragment>
    );
};

export default Auth;
