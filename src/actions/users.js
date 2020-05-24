import * as types from '../types/users';

export const startAddingUser = (name, lastname, email, password, username, age) => ({
    type: types.USER_ADD_STARTED,
    payload: { 
        email, 
        password,
        name, 
        lastname,
        username,
        age
    },
});

export const completeAddingUser = user => ({
    type: types.USER_ADD_COMPLETED,
    payload: {
        user
    }
});

export const failAddingUser = error => ({
    type: types.USER_ADD_FAILED,
    payload: { 
        error,
    },
});