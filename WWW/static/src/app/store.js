import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from './reducers';
import settings from './settings';

const rootReducer = combineReducers(reducers);
const createStoreWithMiddleware = settings.VERBOSE ?
    applyMiddleware(thunkMiddleware, createLogger())(createStore) :
    applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('reducers', () => {
            const nextRootReducer = require('reducers');
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}

const store = configureStore();
export default store;

const { dispatch } = store;
export {
    dispatch
}