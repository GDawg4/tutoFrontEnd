import {call, takeEvery, put, race, all, delay, select} from 'redux-saga/effects'
import {normalize} from 'normalizr'

import * as constants from '../resources/constants';
import * as transactionActions from '../actions/transactions';
import * as types from '../types/transactions';
import * as schemas from '../schemas/transactions';
import * as bookSchemas from '../schemas/books';
import * as selectors from '../reducers';


function* fetchTransactions(action) {
    try{
        const user_pk = yield select(selectors.getAuthUserId)
        const response = yield call(
            fetch,
            //todas hechas por el usuario
            `${constants.API_BASE_URL_ANDROID}/reader/${user_pk}/own-transactions`,
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
                entities:{transaction},
                result
            } = normalize(jsonResult, schemas.transactionListSchema);
            yield put(
                transactionActions.completeFetchingTransaction(transaction, result),
            )

        }else{
            const jsonError = yield response.json();
            yield put(transactionActions.failFetchingTransaction(jsonError))
        }
    }catch (error) {
        console.log(error)
    }
}

export function* watchTransactionsFetch() {
    yield takeEvery(
        types.TRANSACTION_FETCH_STARTED,
        fetchTransactions
    )
}

function* fetchOwnedBooks(action) {
    try{
        const user_pk = yield select(selectors.getAuthUserId)
        const response = yield call(
            fetch,
            `${constants.API_BASE_URL_ANDROID}/reader/${user_pk}/owned/`,
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
            yield put(
                transactionActions.completeFetchingOwnBooks(book, result),
            )

        }else{
            const jsonError = yield response.json();
            yield put(transactionActions.failFetchingTransaction(jsonError))
        }
    }catch (error) {
        console.log(error)
    }
}


export function* watchFetchOwnedBooks() {
    yield takeEvery(
        types.OWN_BOOKS_FETCH_STARTED,
        fetchOwnedBooks
    )
}