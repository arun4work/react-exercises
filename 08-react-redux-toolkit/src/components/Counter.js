import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement, toggleCounter} from '../store/counter';
import classes from './Counter.module.css';

const Counter = () => {
    const counter = useSelector((state) => state.counter.counter);
    const isShow = useSelector((state) => state.counter.isShow);
    const dispatch = useDispatch();

    const incrementHandler = () => {
        dispatch(increment());
    };

    const decrementHandler = () => {
        dispatch(decrement());
    };

    const toggleCounterHandler = () => {
        dispatch(toggleCounter());
    };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {isShow && <div className={classes.value}>{counter}</div>}
            <button onClick={incrementHandler}>Increment</button>
            <button onClick={decrementHandler}>Decrement</button>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
