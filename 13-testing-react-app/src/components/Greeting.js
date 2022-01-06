import {useState} from 'react';

const Greeting = () => {
    const [changeText, setChangeText] = useState(false);

    const changeTextHandler = () => {
        setChangeText(true);
    };

    return (
        <div>
            <h2>Hello World!</h2>
            {!changeText && <h3>It's good to see you!</h3>}
            {changeText && <h3>Text changed!</h3>}
            <button onClick={changeTextHandler}>Change Text</button>
        </div>
    );
};

export default Greeting;
