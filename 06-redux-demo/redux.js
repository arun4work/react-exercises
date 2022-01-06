const redux = require('redux');

//initial store to create store by redux.createStore method
const initialStore = {
    counter: 0,
};

//reducer function to update the store and return a new updated store based on action dispatch
const reducerFunction = (state = initialStore, action) => {
    if (action.type === 'increment') {
        return {counter: state.counter + 1};
    }

    if (action.type === 'decrement') {
        return {counter: state.counter - 1};
    }

    return state;
};

//creating the store
const store = redux.createStore(reducerFunction);

//subscriperFunction to listen to the store change
const subscriberFunction = () => {
    console.log('inside subscriberFunction', store.getState());
};

//subscribing the store to listen the changes in subscriberFunction
store.subscribe(subscriberFunction);

//dispatch an action, which will be caught in reducer and accordingly update the store and return new updated store
store.dispatch({type: 'increment'});

store.dispatch({type: 'decrement'});
