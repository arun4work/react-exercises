import {useParams, Route, Link, useRouteMatch} from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import {useEffect} from 'react';
import useHttp from '../hooks/use-http';
import {getSingleQuote} from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const QuoteDetail = () => {
    const {
        sendRequest,
        data: loadedQuote,
        error,
        status,
    } = useHttp(getSingleQuote);
    const {quoteId} = useParams();
    const match = useRouteMatch();

    useEffect(() => {
        console.log('useEffect Running QuoteDetails.js');
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className='centered'>{error}</p>;
    }

    if (!loadedQuote || !loadedQuote.text) {
        return <p>No quote found!</p>;
    }

    return (
        <section>
            <HighlightedQuote
                text={loadedQuote.text}
                author={loadedQuote.author}
            />

            {/* Conditionally render Comments link if comment section is not dispayed with nested Route */}
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link className='btn' to={`${match.url}/comments`}>
                        Comments
                    </Link>
                </div>
            </Route>

            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </section>
    );
};

export default QuoteDetail;
