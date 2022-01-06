import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../store/auth';

import classes from './Header.module.css';

const Header = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const logOutHandler = () => {
        dispatch(logout());
    };
    return (
        <header className={classes.header}>
            <h1>Redux Auth</h1>
            {isLoggedIn && (
                <nav>
                    <ul>
                        <li>
                            <a href='/'>My Products</a>
                        </li>
                        <li>
                            <a href='/'>My Sales</a>
                        </li>
                        <li>
                            <button onClick={logOutHandler}>Logout</button>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
