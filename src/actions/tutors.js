import * as types from '../types/tutors';

export const startFetchingTutor = () => ({
    type: types.TUTOR_FETCH_STARTED,
});
export const completeFetchingTutor = (entities, order) => ({
    type: types.TUTOR_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingTutor = error => ({
    type: types.TUTOR_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startAddingTutor = course => ({
    type: types.TUTOR_ADD_STARTED,
    payload: course,
});
export const completeAddingTutor = (oldId, course) => ({
    type: types.TUTOR_ADD_COMPLETED,
    payload: {
        oldId,
        course,
    },
});
export const failAddingTutor = (oldId, error) => ({
    type: types.TUTOR_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const selectTutor = (id) => ({
    type: types.TUTOR_SELECTED,
    payload: {
        id
    }
});

export const deselectTutor = () => ({
    type: types.TUTOR_DESELECTED
});