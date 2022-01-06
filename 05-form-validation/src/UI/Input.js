const Input = (props) => {
    let errMessage = '';
    let errClasses = 'form-control';
    if (props.hasError) {
        errMessage = <p className='error-text'>{props.errMessage}</p>;
        errClasses = 'form-control invalid';
    }

    return (
        <div className={errClasses}>
            <label htmlFor={props.id}>First Name</label>
            <input
                type={props.type || 'text'}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                autoComplete='nope' //added randome string as off was not working in chorme
            />
            {errMessage}
        </div>
    );
};

export default Input;
