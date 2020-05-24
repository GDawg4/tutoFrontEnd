import { fork, all } from 'redux-saga/effects'

import { watchBooksFetch } from './books';
import { watchLoginStarted } from './auth';
import { watchAddUser } from './users';

function* mainSaga() {
    yield all([
        fork(watchBooksFetch),
        fork(watchLoginStarted),
        fork(watchAddUser)
    ])
}

export default mainSaga;