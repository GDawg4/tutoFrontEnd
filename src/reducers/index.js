import {combineReducers} from "redux";

import books, * as bookSelectors from './books'

const reducer = combineReducers({
    books
})

export default reducer

export const getBookByID = (state) => bookSelectors.getBookByID(state.books);
export const getBookOrder = (state) => bookSelectors.getBookOrder(state.books);
export const getAllBooks = (state) => bookSelectors.getAllBooks(state.books);
export const getSelectedBook = (state) => bookSelectors.getSelectedBook(state.books);
export const getIsFetchingBooks = (state) => bookSelectors.getIsFetching(state.books)