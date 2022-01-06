import React from 'react';
import classes from './Input.module.css';
const Input = React.forwardRef((props, ref) => {
    const updatedClass = `${classes.input} ${props.className}`;
    return (
        <div className={updatedClass}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
            {props.errorMessage && <p>{props.errorMessage}</p>}
        </div>
    );
});

export default Input;
