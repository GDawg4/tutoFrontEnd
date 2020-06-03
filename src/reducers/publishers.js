import { combineReducers } from 'redux';

import * as types from '../types/publishers';
import includes from "lodash/includes";

const byId = (state = {}, action) => {
    switch(action.type) {
        case types.PUBLISHER_FETCH_COMPLETED: {
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
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.PUBLISHER_FETCH_COMPLETED: {
            return [...state, ...action.payload.order.filter(newElement => !includes(state, newElement))];
        }
        default: {
            return state;
        }
    }
};

const selected = (state = null, action) => {
    switch (action.type) {
        case types.PUBLISHER_SELECTED: {
            return action.payload.id
        }
        case types.PUBLISHER_DESELECTED: {
            return null
        }
        default: {
            return state
        }
    }
}

const isFetchingPublishers = (state = false, action) => {
    switch(action.type) {
        case types.PUBLISHER_FETCH_STARTED: {
            return true;
        }
        case types.PUBLISHER_FETCH_COMPLETED: {
            return false;
        }
        case types.PUBLISHER_FETCH_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.PUBLISHER_FETCH_FAILED: {
            return action.payload.error;
        }
        case types.PUBLISHER_FETCH_STARTED: {
            return null;
        }
        case types.PUBLISHER_FETCH_COMPLETED: {
            return null;
        }
        default: {
            return state;
        }
    }
};

const publisherBooks = (state = [], action) => {
    switch (action.type) {
        case types.PUBLISHER_BOOKS_FETCH_COMPLETED: {
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
}



export default combineReducers({
    byId,
    order,
    selected,
    isFetchingPublishers,
    error,
    publisherBooks
});

export const getPublisher = (state, id) => state.byId[id];
export const getPublishers = state => state.order.map(id => getPublisher(state, id));
export const selectedPublisher = state => getPublisher(state, state.selected);
export const getPublisherBooks = state => state.publisherBooks;
export const isFetching = state => state.isFetchingPublishers;