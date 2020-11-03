import jwtDecode from 'jwt-decode';
import { combineReducers } from 'redux';

import * as types from '../types/auth';
import actions from "redux-form/lib/actions";


const token = (state = null, action) => {
	switch(action.type) {
    	case types.AUTHENTICATION_STARTED: {
      		return null;
    	}
    	case types.AUTHENTICATION_COMPLETED: {
      		return action.payload.token;
    	}
    	case types.AUTHENTICATION_FAILED: {
      		return null;
    	}
    	case types.AUTHENTICATION_IDENTITY_CLEARED: {
      		return null;
    	}
    	case types.TOKEN_REFRESH_COMPLETED: {
      		return action.payload.newToken;
    	}
    	default: {
      		return state;
    	}
  	}
};

const decoded = (state = null, action) => {
  	switch(action.type) {
	    case types.AUTHENTICATION_STARTED: {
      		return null;
    	}
    	case types.AUTHENTICATION_COMPLETED: {
      		return jwtDecode(action.payload.token);
    	}
    	case types.TOKEN_REFRESH_COMPLETED: {
      		return jwtDecode(action.payload.newToken);
    	}
    	case types.AUTHENTICATION_FAILED: {
      		return null;
    	}
    	case types.AUTHENTICATION_IDENTITY_CLEARED: {
      		return null;
    	}
    	default: {
      		return state;
    	}
  	}
};

const isAuthenticating = (state = false, action) => {
  	switch(action.type) {
	    case types.AUTHENTICATION_STARTED: {
      		return true;
    	}
    	case types.AUTHENTICATION_COMPLETED: {
      		return false;
    	}
    	case types.AUTHENTICATION_FAILED: {
      		return false;
    	}
    	default: {
      		return state;
    	}
  	}
};

const isRefreshing = (state = false, action) => {
  	switch(action.type) {
	    case types.TOKEN_REFRESH_STARTED: {
      		return true;
    	}
    	case types.TOKEN_REFRESH_COMPLETED: {
      		return false;
    	}
    	case types.TOKEN_REFRESH_FAILED: {
      		return false;
    	}
    	default: {
      		return state;
    	}
  	}
};


const authenticatingError = (state = null, action) => {
  	switch(action.type) {
	    case types.AUTHENTICATION_STARTED: {
      		return null;
    	}
    	case types.AUTHENTICATION_COMPLETED: {
      		return null;
    	}
    	case types.AUTHENTICATION_FAILED: {
      		return action.payload.error;
    	}
	    default: {
      		return state;
    	}
  	}
};

const refreshingError = (state = null, action) => {
  	switch(action.type) {
	    case types.TOKEN_REFRESH_STARTED: {
      		return null;
    	}
    	case types.TOKEN_REFRESH_COMPLETED: {
      		return null;
    	}
    	case types.TOKEN_REFRESH_FAILED: {
      		return action.payload.error;
    	}
    	default: {
      		return state;
    	}
  	}
};

const info = (state = null, action) => {
	switch(action.type) {
		case types.INFO_FETCH_COMPLETED: {
			return action.payload.info;
		}
		default: {
			return state;
		}
	}
}

const auth = combineReducers({
	token,
	decoded,
	isAuthenticating,
	isRefreshing,
	authenticatingError,
	refreshingError,
	info
});

export default auth;

export const getAuthToken = state => state.token;
export const getIsAuthenticating = state => state.isAuthenticating;
export const getAuthenticatingError = state => state.authenticatingError;
export const getAuthUserId = state => state.decoded ? state.decoded.user_id : null;
export const getAuthExpiration = state => state.decoded ? state.decoded.exp : null;
export const getAuthUsername = state => state.decoded ? state.decoded.username : null;
export const getAuthEmail = state => state.decoded ? state.decoded.email : null;
export const getIsRefreshingToken = state => state.isRefreshing;
export const getRefreshingError = state => state.refreshingError;
export const getDecoded = state => state;
export const getInfo = state => state.info