import AuthorDetails from "../AuthorDetails";
import React from 'react'
import {configureStore} from "../../store";
import {Provider} from 'react-redux'
import renderer from "react-test-renderer";
import Home from "../Home";
import Author from "../Author";
import Tutor from "../Tutor";
const {store, persistor} = configureStore()

it('should AuthorDetails renders correctly', () => {
    const tree = renderer.create(
        <Provider store={store}>
            <Tutor info={{
                'name':'Rodrigo',
                'lastname':'Garoz',
                'type': 'tutor',
            }} />
        </Provider>).toJSON();
    expect(tree).toMatchSnapshot()
    }
)