import { combineReducers } from "redux";

import auth, * as authSelectors from './auth';
import books, * as bookSelectors from './books';

const reducer = combineReducers({
    auth,
    books,
})

export default reducer;

export const getBookByID = (state) => bookSelectors.getBookByID(state.books);
export const getBookOrder = (state) => bookSelectors.getBookOrder(state.books);
export const getAllBooks = (state) => bookSelectors.getAllBooks(state.books);
export const getSelectedBook = (state) => bookSelectors.getSelectedBook(state.books);
export const getIsFetchingBooks = (state) => bookSelectors.getIsFetching(state.books);

export const getAuthToken = state => authSelectors.getAuthToken(state.reducer.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.reducer.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.reducer.auth);
export const getAuthUserId = state => authSelectors.getAuthUserId(state.reducer.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.reducer.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.reducer.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.reducer.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.reducer.auth);
export const isAuthenticated = state => getAuthToken(state) != null;