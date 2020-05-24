import { fork, all } from 'redux-saga/effects'

import { watchBooksFetch } from './books';
import { watchLoginStarted } from './auth';

function* mainSaga() {
    yield all([
        fork(watchBooksFetch),
        fork(watchLoginStarted)
    ])
}

export default mainSaga;