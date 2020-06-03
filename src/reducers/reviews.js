import {combineReducers} from 'redux'
import omit from 'lodash/omit';
import includes from 'lodash/includes'
import uniq from 'lodash/uniq'

import * as types from '../types/reviews';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.REVIEW_FETCH_COMPLETED: {
            const { entities, order } = action.payload;
            const newState = { ...state };
            order.forEach(id => {
                newState[id] = {
                    ...entities[id],
                    isConfirmed: true,
                };
            });

            return newState;
        }
        case types.REVIEW_ADD_STARTED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };
            return newState;
        }
        case types.REVIEW_ADD_COMPLETED: {
            const { oldId, review } = action.payload;
            const newState = omit(state, oldId);
            newState[review.id] = {
                ...review,
                isConfirmed: true,
            };
            return newState;
        }
        case types.REVIEW_REMOVE_STARTED: {
            return omit(state, action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.REVIEW_FETCH_COMPLETED: {
            return [...state, ...action.payload.order.filter(newElement => !includes(state, newElement))];
        }
        case types.REVIEW_ADD_STARTED: {
            return [...state, action.payload.id];
        }
        case types.REVIEW_ADD_COMPLETED: {
            const { oldId, review } = action.payload;
            return state.map(id => id === oldId ? review.id : id);
        }
        case types.REVIEW_REMOVE_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const selected = (state = null, action) => {
    switch (action.type) {
        case types.REVIEW_SELECTED : {
            return action.payload.id
        }
        case types.REVIEW_DESELECTED: {
            return null
        }
        default:{
            return state
        }
    }
}

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.REVIEW_FETCH_STARTED: {
            return true;
        }
        case types.REVIEW_FETCH_COMPLETED: {
            return false;
        }
        case types.REVIEW_FETCH_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.REVIEW_FETCH_FAILED: {
            return action.payload.error;
        }
        case types.REVIEW_FETCH_STARTED: {
            return null;
        }
        case types.REVIEW_FETCH_COMPLETED: {
            return null;
        }
        default: {
            return state;
        }
    }
};


export default combineReducers({
    byId,
    order,
    selected,
    isFetching,
    error,
});

export const getReviewByID = (state, id) => state.byId[id];
export const getReviewOrder = (state) => state.order;
export const getAllReviews = (state) =>state.order.map(id => getReviewByID(state, id));
export const getSelectedReview = (state) => getReviewByID(state, state.selected);
export const getIsFetchingReview = (state) => state.isFetching;