import * as types from '../types/publishers';

export const startFetchingPublisher = () => ({
    type: types.PUBLISHER_FETCH_STARTED,
});
export const completeFetchingPublisher = (entities, order) => ({
    type: types.PUBLISHER_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingPublisher = error => ({
    type: types.PUBLISHER_FETCH_FAILED,
    payload: {
        error,
    },
});


export const selectPublisher = (id) => ({
    type: types.PUBLISHER_SELECTED,
    payload: {
        id
    }
});

export const deselectPublisher = () => ({
    type: types.PUBLISHER_DESELECTED
});

export const startFetchingPublisherBooks = () => ({
    type: types.PUBLISHER_BOOKS_FETCH_STARTED,
});
export const completeFetchingPublisherBooks = (entities, order) => ({
    type: types.PUBLISHER_BOOKS_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingPublisherBooks = error => ({
    type: types.PUBLISHER_BOOKS_FETCH_FAILED,
    payload: {
        error,
    },
});