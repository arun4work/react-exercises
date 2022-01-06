import useInput from '../hooks/use-input';
import Input from '../UI/Input';

const BasicForm = (props) => {
    const {
        value: firstName,
        isValid: isFirstNameValid,
        hasError: hasFirstNameError,
        reset: resetFirstName,
        changeHandler: firstNameChangeHandler,
        blurHandler: firstNameBlurHandler,
    } = useInput((firstName) => firstName.trim() !== '');

    const {
        value: lastName,
        isValid: isLastNameValid,
        hasError: hasLastNameError,
        reset: resetLastName,
        changeHandler: lastNameChangeHandler,
        blurHandler: lastNameBlurHandler,
    } = useInput((lastName) => lastName.trim() !== '');

    const {
        value: email,
        isValid: isEmailValid,
        hasError: hasEmailError,
        reset: resetEmail,
        changeHandler: emailChangeHandler,
        blurHandler: emailBlurHandler,
    } = useInput(
        (email) =>
            email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );

    let isFormValid = false;
    if (isFirstNameValid && isLastNameValid && isEmailValid) {
        isFormValid = true;
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log('formSubmitHandler');
        console.log(firstName, lastName, email);
        resetFirstName();
        resetLastName();
        resetEmail();
    };

    console.log('BasicForm Running');
    return (
        <form onSubmit={formSubmitHandler}>
            <div className='control-group'>
                <Input
                    id='firstname'
                    type='text'
                    value={firstName}
                    onChange={firstNameChangeHandler}
                    onBlur={firstNameBlurHandler}
                    errMessage={'Please input your first name.'}
                    hasError={hasFirstNameError}
                />

                <Input
                    id='lastname'
                    type='text'
                    value={lastName}
                    onChange={lastNameChangeHandler}
                    onBlur={lastNameBlurHandler}
                    errMessage={'Please input your last name'}
                    hasError={hasLastNameError}
                />

                <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    errMessage={'Please input valid email.'}
                    hasError={hasEmailError}
                />
            </div>

            <div className='form-actions'>
                <button type='submit' disabled={isFormValid ? '' : 'disabled'}>
                    Submit
                </button>
            </div>
        </form>
    );
};

export default BasicForm;
