import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import{
    persistStore,
    persistReducer
} from 'redux-persist'
import {composeWithDevTools} from "redux-devtools-extension";
import storage from 'redux-persist/lib/storage'

import reducer from './reducers'
import saga from './sagas'

export const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const persistedReducer = persistReducer(
        {
            key:'rootx',
            storage,
            whitelist:['auth']
        },
        reducer
    )

    const composeEnhancers = composeWithDevTools({
        trace: true
    })

    const store = createStore(
        persistedReducer,
        composeEnhancers(
            applyMiddleware(sagaMiddleware)
        )
    );

    const persistor = persistStore(store);

    //sagaMiddleware.run(saga)

    return{store, persistor}

}