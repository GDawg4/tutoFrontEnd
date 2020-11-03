import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from "redux-devtools-extension";
import { AsyncStorage } from 'react-native';
import { reducer as form } from 'redux-form';

import reducer from './reducers'
import mainSaga from './sagas'

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const newReducer = combineReducers({
    reducer,
    form,
  })

    const persistedReducer = persistReducer(
        {
          key: 'root',
          storage: AsyncStorage,
          whitelist:['auth']
        },
        newReducer
    )

  const composeEnhancers = composeWithDevTools({
    trace: true,
  })

  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )

  const persistor = persistStore(store)

  sagaMiddleware.run(mainSaga)

  return { store, persistor }
}
