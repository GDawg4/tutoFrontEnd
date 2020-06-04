import { combineReducers } from 'redux'
import omit from 'lodash/omit';
import includes from 'lodash/includes'

import * as types from '../types/transactions';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.TRANSACTION_FETCH_COMPLETED: {
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
        case types.TRANSACTION_ADD_STARTED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };
            return newState;
        }
        case types.TRANSACTION_ADD_COMPLETED: {
            const { oldId, petOwner } = action.payload;
            const newState = omit(state, oldId);
            newState[petOwner.id] = {
                ...petOwner,
                isConfirmed: true,
            };
            return newState;
        }
        case types.TRANSACTION_REMOVE_STARTED: {
            return omit(state, action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.TRANSACTION_FETCH_COMPLETED: {
            return [...state, ...action.payload.order.filter(newElement => !includes(state, newElement))];
        }
        case types.TRANSACTION_ADD_STARTED: {
            return [...state, action.payload.id];
        }
        case types.TRANSACTION_ADD_COMPLETED: {
            const { oldId, petOwner } = action.payload;
            return state.map(id => id === oldId ? petOwner.id : id);
        }
        case types.TRANSACTION_REMOVE_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const selected = (state = null, action) => {
    switch (action.type) {
        case types.TRANSACTION_SELECTED: {
            return payload.transaction
        }
        case types.TRANSACTION_DESELECTED: {
            return null
        }
        default:{
            return state
        }
    }
}

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.TRANSACTION_FETCH_STARTED: {
            return true;
        }
        case types.TRANSACTION_FETCH_COMPLETED: {
            return false;
        }
        case types.TRANSACTION_FETCH_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const ownedBooks = (state = [], action) => {
    switch (action.type) {
        case types.OWN_BOOKS_FETCH_COMPLETED: {
            const { entities, order } = action.payload;
            const newState = [];
            order.forEach(id => 
                newState.push({
                    ...entities[id],
                    isConfirmed: true,
                })
            )

            return newState;
        }
        default: {
            return state;
        }
    }   
};

const readingBook = (state = null, action) => {
    switch(action.type) {
        case types.READ_BOOK: {
            return action.payload.book_src;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.TRANSACTION_FETCH_FAILED: {
            return action.payload.error;
        }
        case types.TRANSACTION_FETCH_STARTED: {
            return null;
        }
        case types.TRANSACTION_FETCH_COMPLETED: {
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
    ownedBooks,
    readingBook,
    isFetching,
    error,
});

export const getTransaction = (state, id) => state.byId[id];
export const getTransactions = state => state.order.map(id => getTransaction(state, id));
export const isFetchingTrans = state => state.isFetching;
export const getIsAdding = state => state.isAdding;
export const getAddingError = state => state.addingError;
export const isSuccessful = state => state.success;
export const getOwnedBooks = state => state.ownedBooks;
export const isReadingBook = state => state.readingBook;
