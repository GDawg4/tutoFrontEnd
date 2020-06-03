import * as types from '../types/notes'
import omit from "lodash/omit";
import includes from "lodash/includes";
import {combineReducers} from "redux";

const byId = (state = {}, action) => {
    switch(action.type) {
        case types.NOTE_FETCH_COMPLETED: {
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
        case types.NOTE_ADD_STARTED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };
            return newState;
        }
        case types.NOTE_ADD_COMPLETED: {
            const { oldId, note } = action.payload;
            const newState = omit(state, oldId);
            newState[note.id] = {
                ...note,
                isConfirmed: true,
            };
            return newState;
        }
        case types.NOTE_REMOVE_STARTED: {
            return omit(state, action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.NOTE_FETCH_COMPLETED: {
            return [...state, ...action.payload.order.filter(newElement => !includes(state, newElement))];
        }
        case types.NOTE_ADD_STARTED: {
            return [...state, action.payload.id];
        }
        case types.NOTE_ADD_COMPLETED: {
            const { oldId, note } = action.payload;
            return state.map(id => id === oldId ? note.id : id);
        }
        case types.NOTE_REMOVE_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const selected = (state = null, action) => {
    switch (action.type) {
        case types.NOTE_SELECTED: {
            return action.payload.id
        }
        case types.NOTE_DESELECTED: {
            return null
        }
        default:{
            return state
        }
    }
}

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.NOTE_FETCH_STARTED: {
            return true;
        }
        case types.NOTE_FETCH_COMPLETED: {
            return false;
        }
        case types.NOTE_FETCH_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.NOTE_FETCH_FAILED: {
            return action.payload.error;
        }
        case types.NOTE_FETCH_STARTED: {
            return null;
        }
        case types.NOTE_FETCH_COMPLETED: {
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

export const getNoteByID = (state, id) => state.byId[id];
export const getNoteOrder = (state) => state.order;
export const getAllNotes = (state) =>state.order.map(id => getNoteByID(state, id));
export const getSelectedNote = (state) => getNoteByID(state, state.selected);
export const getIsFetching = (state) => state.isFetching;