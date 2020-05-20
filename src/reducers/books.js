import {combineReducers} from 'redux'
import omit from 'lodash/omit';

import * as types from '../types/books';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.BOOK_FETCH_COMPLETED: {
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
        case types.BOOK_ADD_STARTED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };
            return newState;
        }
        case types.BOOK_ADD_COMPLETED: {
            const { oldId, petOwner } = action.payload;
            const newState = omit(state, oldId);
            newState[petOwner.id] = {
                ...petOwner,
                isConfirmed: true,
            };
            return newState;
        }
        case types.BOOK_REMOVE_STARTED: {
            return omit(state, action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.BOOK_FETCH_COMPLETED: {
            return [...state, ...action.payload.order];
        }
        case types.BOOK_ADD_STARTED: {
            return [...state, action.payload.id];
        }
        case types.BOOK_ADD_COMPLETED: {
            const { oldId, petOwner } = action.payload;
            return state.map(id => id === oldId ? petOwner.id : id);
        }
        case types.BOOK_REMOVE_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const selected = (state = null, action) => {
    switch (action.type) {
        case types.BOOK_SELECTED: {
            return payload.book
        }
        case types.BOOK_DESELECTED: {
            return null
        }
        default:{
            return state
        }
    }
}

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.BOOK_FETCH_STARTED: {
            return true;
        }
        case types.BOOK_FETCH_COMPLETED: {
            return false;
        }
        case types.BOOK_FETCH_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.BOOK_FETCH_FAILED: {
            return action.payload.error;
        }
        case types.BOOK_FETCH_STARTED: {
            return null;
        }
        case types.BOOK_FETCH_COMPLETED: {
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

export const getBookByID = (state, id) => state.byId[id];
export const getBookOrder = (state) => state.order;
export const getAllBooks = (state) =>state.order.map(id => getBookByID(state, id));
export const getSelectedBook = (state) => getBookByID(state, state.selected);
export const getIsFetching = (state) => state.isFetching;