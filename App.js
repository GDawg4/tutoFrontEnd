import * as React from 'react';
import { Platform, Alert } from 'react-native';
import { configureStore } from './src/store'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NativeRouter, Link, Route } from 'react-router-native';

import Book from "./src/components/Book";
import LoginForm from './src/components/LoginForm';
import RegistryForm from './src/components/RegistryForm';
import BottomTabs from './src/components/BottomTabs';

const { store, persistor } = configureStore();
// import Books from "./src/components/Books";
// import * as bookActions from './src/actions/books'

// store.dispatch(bookActions.startFetchingBook())

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

const App =  () => (
    <Provider store = {store}>
        <PersistGate loading = {null} persistor = {persistor}>
          <NativeRouter>
              {/* <Book title = 'Test1' author='Author1' price='0.99'/> */}
              {/* <Books/> */}
              {/* <Route 
                exact 
                path="/" 
                render={() => <LoginForm onSubmit={values => Alert.alert('Submitted!', JSON.stringify(values))}/>} 
              />
              <Route 
                exact 
                path="/registry" 
                render={() => <RegistryForm onSubmit={values => Alert.alert('Submitted!', JSON.stringify(values))} />} 
              />
              <Route 
                exact 
                path="/app" 
                component={BottomTabs} 
              /> */}
              <BottomTabs />
          </NativeRouter>
        </PersistGate>
    </Provider>
)

export default App;

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});*/
