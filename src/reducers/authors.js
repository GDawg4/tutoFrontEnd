import {combineReducers} from 'redux'
import omit from 'lodash/omit';

import * as types from '../types/authors';
import includes from "lodash/includes";

const byId = (state = {}, action) => {
    switch(action.type) {
        case types.AUTHOR_FETCH_COMPLETED: {
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
        case types.AUTHOR_ADD_STARTED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };
            return newState;
        }
        case types.AUTHOR_ADD_COMPLETED: {
            const { oldId, author } = action.payload;
            const newState = omit(state, oldId);
            newState[author.id] = {
                ...author,
                isConfirmed: true,
            };
            return newState;
        }
        case types.AUTHOR_REMOVE_STARTED: {
            return omit(state, action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.AUTHOR_FETCH_COMPLETED: {
            return [...state, ...action.payload.order.filter(newElement => !includes(state, newElement))];
        }
        case types.AUTHOR_ADD_STARTED: {
            return [...state, action.payload.id];
        }
        case types.AUTHOR_ADD_COMPLETED: {
            const { oldId, author } = action.payload;
            return state.map(id => id === oldId ? author.id : id);
        }
        case types.AUTHOR_REMOVE_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const selected = (state = null, action) => {
    switch (action.type) {
        case types.AUTHOR_SELECTED: {
            return action.payload.id
        }
        case types.AUTHOR_DESELECTED: {
            return null
        }
        default:{
            return state
        }
    }
}

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.AUTHOR_FETCH_STARTED: {
            return true;
        }
        case types.AUTHOR_FETCH_COMPLETED: {
            return false;
        }
        case types.AUTHOR_FETCH_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.AUTHOR_FETCH_FAILED: {
            return action.payload.error;
        }
        case types.AUTHOR_FETCH_STARTED: {
            return null;
        }
        case types.AUTHOR_FETCH_COMPLETED: {
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

export const getAuthor = (state, id) => state.byId[id];
export const getAuthors = state => state.order.map(id => getAuthor(state, id));
export const getIsAdding = state => state.isAdding;
export const getAddingError = state => state.addingError;
export const isSuccessful = state => state.success;
export const selectedAuthor = state => getAuthor(state, state.selected)