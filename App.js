import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NativeRouter, Route } from 'react-router-native'

import { configureStore } from './src/store'

import LoginForm from './src/components/LoginForm'
import RegistryForm from './src/components/RegistryForm'
import BottomTabs from './src/components/BottomTabs'

const { store, persistor } = configureStore()

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NativeRouter>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/registry" component={RegistryForm} />
        <Route exact path="/r" component={BottomTabs} />
      </NativeRouter>
    </PersistGate>
  </Provider>
)

export default App
