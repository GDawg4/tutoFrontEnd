import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import * as types from '../types/users';


const byId = (state = {}, action) => {
    switch (action.type) {
        case types.USER_FETCH_COMPLETED: {
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
        case types.USER_ADD_STARTED: {
            const newState = { ...state };

            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed: false,
            };

            return newState;
        }
        case types.USER_ADD_COMPLETED: {
            const { oldId, user } = action.payload;
            const newState = omit(state, oldId);

            newState[user.id] = {
                ...user,
                isConfirmed: true,
            };

            return newState;
        }
        case types.USER_REMOVE_COMPLETED: {
            return omit(state, action.payload.id)
        }
        default:{
            return state;
        }
    }
}

const order = (state = [], action) => {
    switch (action.type) {
        case types.USER_FETCH_COMPLETED: {
            return action.payload.order
        }
        case types.USER_ADD_STARTED: {
            return [...state, action.payload.id]
        }
        case types.USER_ADD_COMPLETED: {
            const { oldId, user } = action.payload;
            return state.map(id => id === oldId ? user.id : id);
        }
        case types.USER_REMOVE_COMPLETED: {
            return omit(state, action.payload.id)
        }
        default:{
            return state;
        }
    }
}

const isAdding = (state = false, action) => {
  	switch(action.type) {
	    case types.USER_ADD_STARTED: {
      		return true;
    	}
    	case types.USER_ADD_COMPLETED: {
      		return false;
    	}
    	case types.USER_ADD_FAILED: {
      		return false;
    	}
    	default: {
      		return state;
    	}
  	}
};

const success = (state = null, action) => {
    switch (action.type) {
        case types.USER_ADD_COMPLETED: {
            return true;
        }
        case types.USER_ADD_FAILED: {
            return false;
        }
        case types.USER_ADD_STARTED: {
            return false;
        }
        case types.USER_CREATED_SUCCESS_CLEARED: {
            return false;
        }
        default:{
            return state;
        }
    }
}

const addingError = (state = null, action) => {
  	switch(action.type) {
	    case types.USER_ADD_STARTED: {
      		return null;
    	}
    	case types.USER_ADD_COMPLETED: {
      		return null;
    	}
    	case types.USER_ADD_FAILED: {
      		return action.payload.error;
        }
        case types.USER_ERROR_CLEARED: {
            return null;
        }
	    default: {
      		return state;
    	}
  	}
};

const users = combineReducers({
    byId,
    order,
    isAdding,
    addingError,
    success,
});


export default users;


export const getUser = (state, id) => state.byId[id];
export const getUsers = state => state.order.map(id => getUser(state, id));
export const getIsAdding = state => state.isAdding;
export const getAddingError = state => state.addingError;
export const isSuccessful = state => state.success;