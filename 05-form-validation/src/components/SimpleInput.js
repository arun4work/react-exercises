import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
    const {
        value: name,
        isValid: isNameValid,
        hasError: hasNameError,
        reset: resetName,
        changeHandler: nameChangeHandler,
        blurHandler: nameBlurHandler,
    } = useInput((value) => {
        return value.trim() !== '';
    });

    const {
        value: email,
        isValid: isEmailValid,
        hasError: hasEmailError,
        reset: resetEmail,
        changeHandler: emailChangeHandler,
        blurHandler: emailBlurHandler,
    } = useInput((email) => {
        return email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    });

    let isFormValid = false;
    if (isNameValid && isEmailValid) {
        isFormValid = true;
    }

    const submitHandler = (e) => {
        e.preventDefault();

        resetName();
        resetEmail();
    };

    const nameInputClasses = hasNameError
        ? 'form-control invalid'
        : 'form-control';

    const emailInputClasses = hasEmailError
        ? 'form-control invalid'
        : 'form-control';

    return (
        <form onSubmit={submitHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    value={name}
                    onBlur={nameBlurHandler}
                    onChange={nameChangeHandler}
                />
                {hasNameError && (
                    <p className='error-text'>Please input name.</p>
                )}
            </div>

            <div className={emailInputClasses}>
                <label htmlFor='email'>Your Email</label>
                <input
                    type='text'
                    id='email'
                    value={email}
                    onBlur={emailBlurHandler}
                    onChange={emailChangeHandler}
                />
                {hasEmailError && (
                    <p className='error-text'>Please input email.</p>
                )}
            </div>

            <div className='form-actions'>
                <button disabled={isFormValid ? '' : 'disabled'}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
