import {call, takeEvery, put, race, all, delay, select} from 'redux-saga/effects'
import {normalize} from 'normalizr'

import * as constants from '../resources/constants'
import * as transactionActions from '../actions/transactions'
import * as authorActions from '../actions/authors'
import * as types from '../types/transactions'
import * as schemas from '../schemas/transactions'
import * as selectors from '../reducers'


function* fetchTransactions(action) {
    try{
        const response = yield call(
            fetch,
            //todas hechas por el usuario
            `${constants.API_BASE_URL_ANDROID}/reader/all-transactions`,
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
            console.log(normalize(jsonResult, schemas.transactionListSchema))
            console.log('lol')
            yield put(
                transactionActions.completeFetchingTransaction(transaction, result),
            )

        }else{
            console.log('lol no')
            const jsonError = yield response.json();
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
