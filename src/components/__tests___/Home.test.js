import Home from "../Home";
import React from 'react'
import {configureStore} from "../../store";
import {Provider} from 'react-redux'
import renderer from "react-test-renderer";
const {store, persistor} = configureStore()

it('Home renders correctly', () => {
    const tree = renderer.create(
        <Provider store={store}>
            <Home/>
        </Provider>).toJSON();
    expect(tree).toMatchSnapshot()
    }
)