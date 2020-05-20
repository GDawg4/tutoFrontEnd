import { fork, all } from 'redux-saga/effects'

import { watchBooksFetch } from "./books";

function* mainSaga() {
    yield all([
        fork(watchBooksFetch)
    ])
}

export default mainSaga;