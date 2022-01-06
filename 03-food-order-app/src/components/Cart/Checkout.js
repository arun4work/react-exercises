import Input from '../CommonUI/Input';
import useInput from '../../hooks/use-input';

import classes from './Checkout.module.css';

const Checkout = (props) => {
    const {
        value: name,
        isValid: isNameValid,
        hasError: hasNameError,
        reset: resetName,
        changeHandler: nameChangeHandler,
        blurHandler: nameBlurHandler,
    } = useInput((name) => name.trim() !== '');

    const {
        value: street,
        isValid: isStreetValid,
        hasError: hasStreetError,
        reset: resetStreet,
        changeHandler: streetChangeHandler,
        blurHandler: streetBlurHandler,
    } = useInput((street) => street.trim() !== '');

    const {
        value: zip,
        isValid: isZipValid,
        hasError: hasZipError,
        reset: resetZip,
        changeHandler: zipChangeHandler,
        blurHandler: zipBlurHandler,
    } = useInput((zip) => zip.trim() !== '' && zip.length === 5);

    const {
        value: city,
        isValid: isCityValid,
        hasError: hasCityError,
        reset: resetCity,
        changeHandler: cityChangeHandler,
        blurHandler: cityBlurHandler,
    } = useInput((city) => city.trim() !== '');

    let isFormValid = false;
    if (
        isNameValid & isStreetValid &&
        isZipValid &&
        isZipValid &&
        isCityValid
    ) {
        isFormValid = true;
    }

    const confirmSubmitHandler = (event) => {
        event.preventDefault();

        if (!isFormValid) {
            return;
        }
        props.onCheckout({name, street, zip, city});
        resetName();
        resetStreet();
        resetZip();
        resetCity();
    };

    return (
        <form className={classes.form} onSubmit={confirmSubmitHandler}>
            <Input
                input={{
                    id: 'name',
                    type: 'text',
                    placeholder: 'Your Name',
                    autoComplete: 'nope',
                    value: name,
                    onChange: nameChangeHandler,
                    onBlur: nameBlurHandler,
                }}
                className={hasNameError && classes.invalid}
                errorMessage={hasNameError && 'Please input valid name.'}
            />
            <Input
                input={{
                    id: 'street',
                    type: 'text',
                    placeholder: 'Street',
                    autoComplete: 'nope',
                    value: street,
                    onChange: streetChangeHandler,
                    onBlur: streetBlurHandler,
                }}
                className={hasStreetError ? classes.invalid : ''}
                errorMessage={hasStreetError && 'Please input valid street.'}
            />
            <Input
                input={{
                    id: 'postal_code',
                    type: 'number',
                    placeholder: 'Postal Code',
                    autoComplete: 'nope',
                    value: zip,
                    onChange: zipChangeHandler,
                    onBlur: zipBlurHandler,
                }}
                className={hasZipError ? classes.invalid : ''}
                errorMessage={
                    hasZipError && 'Please input valid city (5 digit number).'
                }
            />
            <Input
                input={{
                    id: 'city',
                    type: 'text',
                    placeholder: 'City',
                    autoComplete: 'nope',
                    value: city,
                    onChange: cityChangeHandler,
                    onBlur: cityBlurHandler,
                }}
                className={hasCityError ? classes.invalid : ''}
                errorMessage={hasCityError && 'Please input valid city.'}
            />
            <div className={classes.actions}>
                <button type='reset' onClick={props.onClick}>
                    Cancel
                </button>
                <button type='submit' className={classes.submit}>
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default Checkout;
