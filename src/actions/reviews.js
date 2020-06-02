import * as types from '../types/reviews';

export const startFetchingReview = () => ({
    type: types.REVIEW_FETCH_STARTED,
});
export const completeFetchingReview = (entities, order) => ({
    type: types.REVIEW_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingReview = error => ({
    type: types.REVIEW_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startFetchingReviewForBook = (id) => ({
    type:types.REVIEW_FOR_BOOK_FETCH_STARTED,
    payload:{
        id
    }
})

export const completeFetchingReviewForBook = (entities, order) => ({
    type: types.REVIEW_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingReviewForBook = error => ({
    type: types.REVIEW_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startAddingReview = review => ({
    type: types.REVIEW_ADD_STARTED,
    payload: review,
});
export const completeAddingReview = (oldId, review) => ({
    type: types.REVIEW_ADD_COMPLETED,
    payload: {
        oldId,
        review,
    },
});
export const failAddingReview = (oldId, error) => ({
    type: types.REVIEW_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startRemovingReview = id => ({
    type: types.REVIEW_REMOVE_STARTED,
    payload: {
        id,
    },
});
export const completeRemovingReview = () => ({
    type: types.REVIEW_REMOVE_COMPLETED,
});
export const failRemovingReview = (id, error) => ({
    type: types.REVIEW_REMOVE_FAILED,
    payload: {
        id,
        error,
    },
});

export const selectReview = (id) => ({
    type: types.REVIEW_SELECTED,
    payload: {
        id
    }
});

export const deselectReview = () => ({
    type: types.REVIEW_DESELECTED
});