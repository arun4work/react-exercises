import {useRef, useEffect} from 'react';
import useHttp from '../../hooks/use-http';
import {addComment} from '../../lib/api';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
    const {sendRequest, error, status} = useHttp(addComment);
    const commentTextRef = useRef();

    const {onAddedComment} = props;
    useEffect(() => {
        console.log('useEffect Running in NewCommentForm!');
        if (status === 'completed' && !error) {
            onAddedComment();
        }
    }, [onAddedComment, status, error]);

    const submitFormHandler = (event) => {
        event.preventDefault();

        // optional: Could validate here

        const enteredText = commentTextRef.current.value;
        // send comment to server
        sendRequest({commentData: {text: enteredText}, quoteId: props.quoteId});
    };

    return (
        <form className={classes.form} onSubmit={submitFormHandler}>
            <div className={classes.control} onSubmit={submitFormHandler}>
                <label htmlFor='comment'>Your Comment</label>
                <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
            </div>
            <div className={classes.actions}>
                <button className='btn'>Add Comment</button>
            </div>
        </form>
    );
};

export default NewCommentForm;
