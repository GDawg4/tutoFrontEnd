import * as types from '../types/authors';

export const startFetchingAuthor = () => ({
    type: types.AUTHOR_FETCH_STARTED,
});
export const completeFetchingAuthor = (entities, order) => ({
    type: types.AUTHOR_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingAuthor = error => ({
    type: types.AUTHOR_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startAddingAuthor = author => ({
    type: types.AUTHOR_ADD_STARTED,
    payload: author,
});
export const completeAddingAuthor = (oldId, author) => ({
    type: types.AUTHOR_ADD_COMPLETED,
    payload: {
        oldId,
        author,
    },
});
export const failAddingAuthor = (oldId, error) => ({
    type: types.AUTHOR_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startRemovingAuthor = id => ({
    type: types.AUTHOR_REMOVE_STARTED,
    payload: {
        id,
    },
});
export const completeRemovingAuthor = () => ({
    type: types.AUTHOR_REMOVE_COMPLETED,
});
export const failRemovingAuthor = (id, error) => ({
    type: types.AUTHOR_REMOVE_FAILED,
    payload: {
        id,
        error,
    },
});

export const selectAuthor = (id) => ({
    type: types.AUTHOR_SELECTED,
    payload: {
        id
    }
});

export const deselectAuthor = () => ({
    type: types.AUTHOR_DESELECTED
});