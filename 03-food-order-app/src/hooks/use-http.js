import {useState, useCallback} from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    const sendRequest = useCallback(async (config) => {
        try {
            setIsLoading(true);
            setIsError(null);
            const response = await fetch(config.url, {
                method: config.method || 'GET',
                body: config.body ? config.body : null,
                headers: config.headers ? config.headers : {},
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            setIsLoading(false);
            return data;
        } catch (err) {
            setIsLoading(false);
            setIsError(err.message || 'Something went wrong!');
        }
    }, []);
    return {
        sendRequest,
        isLoading,
        isError,
    };
};

export default useHttp;
