import {useRef, useContext} from 'react';
import useHttp from '../../hooks/use-http';
import {changePassword} from '../../lib/api';
import AuthContext from '../../store/auth-context';
import {useHistory} from 'react-router-dom';

import classes from './ProfileForm.module.css';

const ProfileForm = () => {
    const history = useHistory();
    const {isLoading, error, sendRequest} = useHttp();
    const passwordRef = useRef();
    const authCtx = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredPassword = passwordRef.current.value;
        const requestData = {
            password: enteredPassword,
            idToken: authCtx.token,
        };
        sendRequest(changePassword, requestData, () => {
            //do something on password change
            history.replace('/');
        });
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            {isLoading && <p>Sending your request...</p>}
            {!isLoading && error && <p>{error}</p>}
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' ref={passwordRef} id='new-password' />
            </div>
            <div className={classes.action}>
                {!isLoading && <button>Change Password</button>}
            </div>
        </form>
    );
};

export default ProfileForm;
