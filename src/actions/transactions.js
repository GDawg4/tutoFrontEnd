import * as types from '../types/transactions';

export const startFetchingTransaction = () => ({
    type: types.TRANSACTION_FETCH_STARTED,
});

export const completeFetchingTransaction = (entities, order) => ({
    type: types.TRANSACTION_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingTransaction = error => ({
    type: types.TRANSACTION_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startAddingTransaction = transaction => ({
    type: types.TRANSACTION_ADD_STARTED,
    payload: transaction,
});
export const completeAddingTransaction = (oldId, transaction) => ({
    type: types.TRANSACTION_ADD_COMPLETED,
    payload: {
        oldId,
        transaction,
    },
});
export const failAddingTransaction = (oldId, error) => ({
    type: types.TRANSACTION_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startRemovingTransaction = id => ({
    type: types.TRANSACTION_REMOVE_STARTED,
    payload: {
        id,
    },
});
export const completeRemovingTransaction = () => ({
    type: types.TRANSACTION_REMOVE_COMPLETED,
});
export const failRemovingTransaction = (id, error) => ({
    type: types.TRANSACTION_REMOVE_FAILED,
    payload: {
        id,
        error,
    },
});

export const selectTransaction = (id) => ({
    type: types.TRANSACTION_SELECTED,
    payload: {
        id
    }
});

export const deselectTransaction = () => ({
    type: types.TRANSACTION_DESELECTED
});

export const startFetchingOwnedBooks = () =>({
    type: types.OWN_BOOKS_FETCH_STARTED
})

export const completeFetchingOwnBooks = (entities, order) => ({
    type: types.OWN_BOOKS_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingOwnBooks = error => ({
    type: types.OWN_BOOKS_FETCH_FAILED,
    payload: {
        error,
    },
});

export const readBook = book_src => ({
    type: types.READ_BOOK,
    payload: {
        book_src
    }
})