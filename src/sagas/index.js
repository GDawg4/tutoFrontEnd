import { fork, all } from 'redux-saga/effects'

import { watchBooksFetch } from './books';
import { watchAuthorsFetch, watchAuthorBooksFetch } from "./authors";
import { watchLoginStarted } from './auth';
import { watchTransactionsFetch } from "./transactions";
import { watchAddUser } from './users';
import { watchTagsFetch } from './tags';
import { watchAddReview, watchFetchReview, watchFetchReviewForBook, watchRemoveReview} from "./reviews";
import { watchCheckUserName, watchBuy, watchGift, watchCartFetch, watchClearCart, watchAddToCart, watchDeleteFromCart } from './cart'
import { watchFetchNotes, watchRemoveNote, watchAddNote} from "./notes";

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
        fork(watchCheckUserName),
        fork(watchBuy),
        fork(watchGift),
        fork(watchFetchNotes),
        fork(watchRemoveNote),
        fork(watchAddNote),
        fork(watchRemoveReview),
        fork(watchCartFetch),
        fork(watchClearCart),
        fork(watchAddToCart),
        fork(watchDeleteFromCart)
    ])
}

export default mainSaga;