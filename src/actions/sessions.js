import * as types from '../types/sessions';

export const startFetchingSession = () => ({
    type: types.SESSION_FETCH_STARTED,
});
export const completeFetchingSession = (entities, order) => ({
    type: types.SESSION_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingSession = error => ({
    type: types.SESSION_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startAddingSession = session => ({
    type: types.SESSION_ADD_STARTED,
    payload: session,
});
export const completeAddingSession = (oldId, session) => ({
    type: types.SESSION_ADD_COMPLETED,
    payload: {
        oldId,
        session,
    },
});
export const failAddingSession = (oldId, error) => ({
    type: types.SESSION_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const selectSession = (id) => ({
    type: types.SESSION_SELECTED,
    payload: {
        id
    }
});

export const deselectSession = () => ({
    type: types.SESSION_DESELECTED
});