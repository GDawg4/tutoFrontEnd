import {
    call, 
    takeEvery, 
    put, 
    select
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as constants from '../resources/constants';
import * as publisherActions from '../actions/publishers';
import * as types from '../types/publishers';
import * as schemas from '../schemas/publishers';
import * as bookSchemas from '../schemas/books';
import * as selectors from '../reducers';


function* fetchPublishers(action) {
    try{
        const response = yield call(
            fetch,
            `${constants.API_BASE_URL_ANDROID}/publisher/`,
            {
                method:'GET',
                headers:{
                    'Authorization':`${yield select(selectors.getAuthToken)}`,
                    'Content-Type':'application/json'
                },
            }
        );
        if (response.status === 200){
            const jsonResult = yield response.json();
            const{
                entities: {publisher},
                result
            } = normalize(jsonResult, schemas.publisherListSchema);
            yield put(
                publisherActions.completeFetchingPublisher(publisher, result)
            )
        } else{
            const jsonError = yield response.json();
            publisherActions.failFetchingPublisher(jsonError);
        }
    } catch (error) {
        console.log(error.message)
    }
}

export function* watchPublishersFetch() {
    yield takeEvery(
        types.PUBLISHER_FETCH_STARTED,
        fetchPublishers
    )
}

function* fetchPublisherBooks(action) {
    try{
        const pub_pk = yield select(selectors.selectedPublisher)
        const response = yield call(
            fetch,
            `${constants.API_BASE_URL_WEB}/publisher/${pub_pk.id}/books/`,
            {
                method:'GET',
                headers:{
                    'Authorization':`${yield select(selectors.getAuthToken)}`,
                    'Content-Type':'application/json'
                },
            }
        );
        if (response.status === 200){
            const jsonResult = yield response.json();
            const { entities: { book }, result } = normalize(jsonResult, bookSchemas.bookListSchema)
            yield put(publisherActions.completeFetchingPublisherBooks(book, result))
        } else{
            const jsonError = yield response.json();
            yield put(publisherActions.failFetchingPublisherBooks(jsonError));
        }
    } catch (error) {
        console.log(error.message)
    }
};

export function* watchPublisherBooksFetch() {
    yield takeEvery(
        types.PUBLISHER_BOOKS_FETCH_STARTED,
        fetchPublisherBooks
    )
};