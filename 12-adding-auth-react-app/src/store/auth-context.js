import React, {useState} from 'react';

/**
 * sign-in - done
 * sing-out - done
 * refresh page, but still persistent auth based on localStorage stored token - done
 * auto sign out after expired time while the page is open - done
 * sign out even if the page is closed and opened again after expiry time has passed - Not done yet
 *
 */

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    logIn: (token) => {},
    logOut: () => {},
});

const calculateRemainingExpirationTime = (expirationTime) => {
    const curTimeInMiliSec = new Date().getTime();
    const expirationTimeInMiliSec = new Date(expirationTime).getTime();
    const remainingTimeInMiliSec = expirationTimeInMiliSec - curTimeInMiliSec;
    return remainingTimeInMiliSec;
};

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const isLoggedIn = !!token;

    const logOutHandler = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    const logInHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        const remainingTime = calculateRemainingExpirationTime(expirationTime);
        setTimeout(logOutHandler, remainingTime);
    };

    const authContext = {
        token: token,
        isLoggedIn: isLoggedIn,
        logIn: logInHandler,
        logOut: logOutHandler,
    };

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
