import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
} from 'redux-saga/effects';

import * as constants from '../resources/constants'
import * as selectors from '../reducers'
import * as types from '../types/reviews'
import * as actions from '../actions/reviews'
import * as schemas from '../schemas/reviews'
import {normalize} from "normalizr";

function* fetchReview(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if (isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${constants.API_BASE_URL_ANDROID}/review`,
                {
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                const jsonResult = yield response.json();
                const{
                    entities: { review },
                    result
                } = normalize(jsonResult, schemas.reviewListSchema);
                yield put(
                    actions.completeFetchingReview(
                        action.payload.id,
                        jsonResult,
                    ),
                );
                yield put(
                    actions.completeFetchingReview(review, result)
                )
            } else {
                console.log('nel')
            }
        }
    }catch (error) {
        yield put(
            actions.failFetchingReview(error)
        )
    }
}

export function* watchFetchReview() {
    yield takeEvery(
        types.REVIEW_FETCH_STARTED,
        fetchReview
    )
}

function* fetchReviewForBook(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const selectedBookID = yield select(selectors.getSelectedBook)
            const response = yield call(
                fetch,
                `${constants.API_BASE_URL_ANDROID}/book/${selectedBookID.id}/reviews`,
                {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            )

            if (response.status === 200){
                const jsonResult = yield response.json();
                const{
                    entities: { review },
                    result
                } = normalize(jsonResult, schemas.reviewListSchema);
                yield put(
                    actions.completeFetchingReview(
                        review,
                        result,
                    ),
                )
            }
        }
    }catch (error) {
        console.log(error.message)
    }
}

export function* watchFetchReviewForBook() {
    yield takeEvery(
        types.REVIEW_FOR_BOOK_FETCH_STARTED,
        fetchReviewForBook
    )
}

function* addReview(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const userName = yield select(selectors.getAuthUsername);
            const response = yield call(
                fetch,
                `${constants.API_BASE_URL_ANDROID}/review/`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        ...action.payload,
                        'reviewer':userName
                    }),
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                const jsonResult = yield response.json();
                console.log(jsonResult)
                yield put(
                    actions.completeAddingReview(
                        action.payload.id,
                        jsonResult,
                    ),
                );
            } else {
                const jsonError = yield response.json()
                yield put(actions.failAddingReview(jsonError))
            }
        }
    } catch (error) {
        console.log("ERROR", error.message)
    }
}

export function* watchAddReview() {
    yield takeEvery(
        types.REVIEW_ADD_STARTED,
        addReview,
    );
}

function* removeReview(action) {
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${constants.API_BASE_URL_ANDROID}/note/${action.payload.id}/`,
                {
                    method:'DELETE',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            )
            if(response.status === 204){
                yield put(
                    actions.completeRemovingReview(action.payload)
                )
            }
        }
    }catch (error) {
        console.log(error)
    }
}

export function* watchRemoveReview() {
    yield takeEvery(
        types.REVIEW_REMOVE_STARTED,
        removeReview
    )
}