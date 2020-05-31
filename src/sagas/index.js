import { fork, all } from 'redux-saga/effects'

import { watchBooksFetch } from './books';
import { watchAuthorsFetch } from "./authors";
import { watchLoginStarted } from './auth';
import { watchTransactionsFetch } from "./transactions";
import { watchAddUser } from './users';
import { watchTagsFetch } from './tags';

function* mainSaga() {
    yield all([
        fork(watchBooksFetch),
        fork(watchLoginStarted),
        fork(watchAddUser),
        fork(watchAuthorsFetch),
        fork(watchTransactionsFetch),
        fork(watchTagsFetch)
    ])
}

export default mainSaga;