import { combineReducers } from "redux";

import auth, * as authSelectors from './auth';
import books, * as bookSelectors from './books';
import users, * as userSelectors from './users';
import authors, * as authorSelectors from "./authors";
import transactions, * as transactionsSelectors from "./transactions";

const reducer = combineReducers({
    auth,
    users,
    books,
    authors,
    transactions
})

export default reducer;

export const getBookByID = (state) => bookSelectors.getBookByID(state.reducer.books);
export const getBookOrder = (state) => bookSelectors.getBookOrder(state.reducer.books);
export const getAllBooks = (state) => bookSelectors.getAllBooks(state.reducer.books);
export const getSelectedBook = (state) => bookSelectors.getSelectedBook(state.reducer.books);
export const getIsFetchingBooks = (state) => bookSelectors.getIsFetching(state.reducer.books);

export const getAuthToken = state => authSelectors.getAuthToken(state.reducer.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.reducer.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.reducer.auth);
export const getAuthUserId = state => authSelectors.getAuthUserId(state.reducer.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.reducer.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.reducer.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.reducer.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.reducer.auth);
export const isAuthenticated = state => getAuthToken(state) != null;

export const getUser = (state, id) => userSelectors.getUser(state.reducer.users, id);
export const getUsers = state => userSelectors.getUsers(state.reducer.users);
export const getIsAdding = state => userSelectors.getIsAdding(state.reducer.users);
export const getAddingError = state => userSelectors.getAddingError(state.reducer.users);
export const isSuccessful = state => userSelectors.isSuccessful(state.reducer.users);

export const getAuthor = (state, id) => authorSelectors.getAuthor(state.reducer.authors, id);
export const getAuthors = state => authorSelectors.getAuthors(state.reducer.authors);
export const getIsAdding = state => authorSelectors.getIsAdding(state.reducer.authors);
export const getAddingError = state => authorSelectors.getAddingError(state.reducer.authors);
export const isSuccessful = state => authorSelectors.isSuccessful(state.reducer.authors);

export const getTransaction = (state, id) => transactionsSelectors.getTransaction(state.reducer.transactions, id);
export const getTransactions = state => transactionsSelectors.getTransactions(state.reducer.transactions);
export const getIsAdding = state => transactionsSelectors.getIsAdding(state.reducer.transactions);
export const getAddingError = state => transactionsSelectors.getAddingError(state.reducer.transactions);
export const isSuccessful = state => transactionsSelectors.isSuccessful(state.reducer.transactions);