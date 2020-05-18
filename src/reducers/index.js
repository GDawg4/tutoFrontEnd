import {combineReducers} from "redux";

import books, * as bookSelectors from './books'

const reducer = combineReducers({
    books
})

export default reducer

