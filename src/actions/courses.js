import * as types from '../types/courses';

export const startFetchingCourse = () => ({
    type: types.COURSE_FETCH_STARTED,
});
export const completeFetchingCourse = (entities, order) => ({
    type: types.COURSE_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingCourse = error => ({
    type: types.COURSE_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startAddingCourse = course => ({
    type: types.COURSE_ADD_STARTED,
    payload: course,
});
export const completeAddingCourse = (oldId, course) => ({
    type: types.COURSE_ADD_COMPLETED,
    payload: {
        oldId,
        course,
    },
});
export const failAddingCourse = (oldId, error) => ({
    type: types.COURSE_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const selectCourse = (id) => ({
    type: types.COURSE_SELECTED,
    payload: {
        id
    }
});

export const deselectCourse = () => ({
    type: types.COURSE_DESELECTED
});