import {useSelector, useDispatch} from 'react-redux';
import classes from './Header.module.css';

const Header = () => {
    const isAuth = useSelector((state) => state.auth.isLoggedIn);
    const logout = useDispatch();

    const logOutHandler = () => {
        logout({type: 'logout'});
    };
    return (
        <header className={classes.header}>
            <h1>Redux Auth</h1>
            {isAuth && (
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
