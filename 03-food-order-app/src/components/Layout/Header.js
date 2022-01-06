import {Fragment} from 'react';
import HeaderCartButton from '../Cart/HeaderCartButton';
import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Food App</h1>
                <HeaderCartButton onClick={props.onShow} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='A table full of delicious food!' />
            </div>
        </Fragment>
    );
};

export default Header;