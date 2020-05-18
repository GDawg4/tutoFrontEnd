import * as types from '../types/books';

export const startFetchingBook = () => ({
    type: types.BOOK_FETCH_STARTED,
});
export const completeFetchingBook = (entities, order) => ({
    type: types.BOOK_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingBook = error => ({
    type: types.BOOK_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startAddingBook = book => ({
    type: types.BOOK_ADD_STARTED,
    payload: book,
});
export const completeAddingBook = (oldId, book) => ({
    type: types.BOOK_ADD_COMPLETED,
    payload: {
        oldId,
        book,
    },
});
export const failAddingBook = (oldId, error) => ({
    type: types.BOOK_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startRemovingBook = id => ({
    type: types.BOOK_REMOVE_STARTED,
    payload: {
        id,
    },
});
export const completeRemovingBook = () => ({
    type: types.BOOK_REMOVE_COMPLETED,
});
export const failRemovingBook = (id, error) => ({
    type: types.BOOK_REMOVE_FAILED,
    payload: {
        id,
        error,
    },
});

export const selectBook = (id) => ({
    type: types.BOOK_SELECTED,
    payload: {
        id
    }
});

export const deselectBook = () => ({
    type: types.BOOK_DESELECTED
});