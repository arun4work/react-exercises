import ReactDOM from 'react-dom';
import Card from './Card';
import Button from './Button';

import classes from './Modal.module.css';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClear}></div>;
};

const Overlay = (props) => {
    return (
        <Card className={classes.modal}>
            <div>
                <header className={classes.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className={classes.content}>{props.message}</div>
                <footer className={classes.actions}>
                    <Button onClick={props.onClear}>Okay</Button>
                </footer>
            </div>
        </Card>
    );
};

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onClear={props.onClear} />,
                document.getElementById('backdrop')
            )}
            {ReactDOM.createPortal(
                <Overlay
                    onClear={props.onClear}
                    title={props.title}
                    message={props.message}
                />,
                document.getElementById('overlay')
            )}
        </>
    );
};

export default Modal;
