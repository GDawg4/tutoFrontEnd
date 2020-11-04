import * as types from '../types/auth';

export const startLogin = (email, password) => ({
    type: types.AUTHENTICATION_STARTED,
    payload: { 
        email, 
        password,
    },
});

export const completeLogin = token => ({
    type: types.AUTHENTICATION_COMPLETED,
    payload: { 
        token,
    },
});

export const failLogin = error => ({
    type: types.AUTHENTICATION_FAILED,
    payload: { 
        error,
    },
});

export const logout = () => ({
    type: types.AUTHENTICATION_IDENTITY_CLEARED,
});

export const startTokenRefresh = () => ({
    type: types.TOKEN_REFRESH_STARTED
});

export const completeTokenRefresh = newToken => ({
    type: types.TOKEN_REFRESH_COMPLETED,
    payload: { 
        newToken,
    },
});

export const failTokenRefresh = error => ({
    type: types.TOKEN_REFRESH_FAILED,
    payload: { 
        error,
    },
});

export const startFetchingInfo = () => ({
    type:types.INFO_FETCH_STARTED
})

export const completeFetchingInfo = info => ({
    type:types.INFO_FETCH_COMPLETED,
    payload:{
        info
    }
})

export const failFetchingInfo = (error) => ({
    type:types.INFO_FETCH_FAILED,
    payload:{
        error
    }
})
