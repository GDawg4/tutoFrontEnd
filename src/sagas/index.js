import { fork, all } from 'redux-saga/effects'

import { watchBooksFetch } from './books';
import { watchAuthorsFetch, watchAuthorBooksFetch } from "./authors";
import { watchLoginStarted, watchRefreshTokenStarted } from './auth';
import { watchTransactionsFetch, watchFetchOwnedBooks } from "./transactions";
import { watchAddUser } from './users';
import { watchTagsFetch } from './tags';
import { watchPublishersFetch, watchPublisherBooksFetch } from './publishers';
import { watchAddReview, watchFetchReview, watchFetchReviewForBook, watchRemoveReview} from "./reviews";
import { watchCheckUserName, watchBuy, watchGift, watchCartFetch, watchClearCart, watchAddToCart, watchDeleteFromCart } from './cart';
import { watchFetchNotes, watchRemoveNote, watchAddNote} from "./notes";
import { watchCoursesFetch} from "./courses";
import { watchTutorsFetch} from "./tutors";

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
        fork(watchPublisherBooksFetch),
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
        fork(watchDeleteFromCart),
        fork(watchFetchOwnedBooks),
        fork(watchRefreshTokenStarted),
        fork(watchCoursesFetch),
        fork(watchTutorsFetch),
    ])
}

export default mainSaga;