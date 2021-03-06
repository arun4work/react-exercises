import classes from './Input.module.css';

const Input = (props) => {
    return (
        <div
            className={`${classes.control} ${
                props.isValid === false ? classes.invalid : ''
            }`}
        >
            <label htmlFor={props.id || 'email'}>{props.children}</label>
            <input
                type={props.type || 'text'}
                id={props.id || 'email'}
                value={props.value || ''}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    );
};

export default Input;
