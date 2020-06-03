import { fork, all } from 'redux-saga/effects'

import { watchBooksFetch } from './books';
import { watchAuthorsFetch, watchAuthorBooksFetch } from "./authors";
import { watchLoginStarted } from './auth';
import { watchTransactionsFetch } from "./transactions";
import { watchAddUser } from './users';
import { watchTagsFetch } from './tags';
import { watchAddReview, watchFetchReview, watchFetchReviewForBook} from "./reviews";
import { watchPublishersFetch, watchPublisherBooksFetch } from './publishers';

function* mainSaga() {
    yield all([
        fork(watchBooksFetch),
        fork(watchLoginStarted),
        fork(watchAddUser),
        fork(watchAuthorsFetch),
        fork(watchTransactionsFetch),
        fork(watchTagsFetch),
        fork(watchAuthorBooksFetch),
        fork(watchAddReview),
        fork(watchFetchReview),
        fork(watchFetchReviewForBook),
        fork(watchPublishersFetch),
        fork(watchPublisherBooksFetch)
    ])
}

export default mainSaga;