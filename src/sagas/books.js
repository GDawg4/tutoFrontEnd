import {call, takeEvery, put, race, all, delay, select} from 'redux-saga/effects'
import {normalize} from 'normalizr'

import * as actions from '../actions/books'
import * as types from '../types/books'
import * as schemas from '../schemas/books'

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

function* fetchBooks(action) {
    try{
        const response = yield call(
            fetch,
            `${BASE_URL}/book/`,
            {
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            }
        );
        if (response.status === 200){
            const jsonResult = yield response.json();
            const{
                entities:{book},
                result
            } = normalize(jsonResult, schemas.bookListSchema);

            yield put(
                actions.completeFetchingBook(book, result)
            )

        }else{
            const jsonError = yield response.json();
            console.log(jsonError)
        }
    }catch (error) {
        console.log(error)
    }
}

export function* watchBooksFetch() {
    yield takeEvery(
        types.BOOK_FETCH_STARTED,
        fetchBooks
    )
}
