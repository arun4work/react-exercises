import {useState} from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const sendRequest = async (requestFunction, requestData, callback) => {
        try {
            setIsLoading(true);
            const data = await requestFunction(requestData);
            callback(data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err.message || 'Something went wrong!');
        }
    };
    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useHttp;
