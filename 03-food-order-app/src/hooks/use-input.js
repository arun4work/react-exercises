import {useState} from 'react';

const useInput = (validate) => {
    const [value, setValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validate(value);
    const hasError = !isValid && isTouched;

    const changeHandler = (event) => {
        setValue(event.target.value);
    };

    const blurHandler = (event) => {
        setIsTouched(true);
    };

    const reset = () => {
        setValue('');
        setIsTouched(false);
    };

    return {
        value,
        isValid,
        hasError,
        reset,
        changeHandler,
        blurHandler,
    };
};

export default useInput;
