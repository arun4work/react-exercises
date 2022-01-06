import QuoteList from '../components/quotes/QuoteList';
import useHttp from '../hooks/use-http';
import {getAllQuotes} from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import {useEffect} from 'react';

const AllQuotes = () => {
    const {
        sendRequest,
        data: loadedQuotes,
        error,
        status,
    } = useHttp(getAllQuotes);

    useEffect(() => {
        console.log('useEffect Running in AllQuotes.js');
        sendRequest();
    }, [sendRequest]);

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

    if (!loadedQuotes || loadedQuotes.length === 0) {
        return <p className='centered'>No Quote found.</p>;
    }

    return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
