import {useCallback, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

import useHttp from '../../hooks/use-http';
import {getAllComments} from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
    const [isAddingComment, setIsAddingComment] = useState(false);
    const {
        sendRequest,
        data: loadedComments,
        error,
        status,
    } = useHttp(getAllComments);
    const {quoteId} = useParams();

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    const addCommentHandler = useCallback(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    let comments;

    if (status === 'pending') {
        comments = (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        );
    }

    if (status === 'completed' && loadedComments && loadedComments.length > 0) {
        comments = <CommentsList comments={loadedComments} />;
    }

    if (
        status === 'completed' &&
        loadedComments &&
        loadedComments.length === 0
    ) {
        comments = <p className='centered'>No comments added yet</p>;
    }

    if (error) {
        comments = <p className='centered'>{error}</p>;
    }

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className='btn' onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && (
                <NewCommentForm
                    quoteId={quoteId}
                    onAddedComment={addCommentHandler}
                />
            )}
            {comments}
        </section>
    );
};

export default Comments;
