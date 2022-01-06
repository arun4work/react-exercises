import {useReducer, useCallback} from 'react';

const httpReducer = (state, action) => {
    if (action.type === 'SEND') {
        return {
            data: null,
            error: null,
            status: 'pending',
        };
    }

    if (action.type === 'SUCCESS') {
        return {
            data: action.payload,
            error: null,
            status: 'completed',
        };
    }

    if (action.type === 'ERROR') {
        return {
            data: null,
            error: action.payload,
            status: 'completed',
        };
    }
    return state;
};

const initialState = {
    data: null,
    error: null,
    status: null,
};

const useHttp = (requestFunction) => {
    const [httpState, dispatch] = useReducer(httpReducer, initialState);

    const sendRequest = useCallback(
        async (requestData) => {
            dispatch({type: 'SEND'});
            try {
                const responseData = await requestFunction(requestData);
                dispatch({type: 'SUCCESS', payload: responseData});
            } catch (err) {
                dispatch({
                    type: 'ERROR',
                    payload: err.message || 'Something went wrong!',
                });
            }
        },
        [requestFunction]
    );

    return {sendRequest, ...httpState};
};

export default useHttp;
