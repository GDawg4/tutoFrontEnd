import {
    call, 
    takeEvery, 
    put, 
    race, 
    all, 
    delay, 
    select
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as constants from '../resources/constants';
import * as authorActions from '../actions/authors';
import * as types from '../types/authors';
import * as schemas from '../schemas/authors';
import * as selectors from '../reducers';


function* fetchAuthors(action) {
    try{
        const response = yield call(
            fetch,
            `${constants.API_BASE_URL_WEB}/author/`,
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
                entities:{author},
                result
            } = normalize(jsonResult, schemas.authorListSchema);
            yield put(
                authorActions.completeFetchingAuthor(author, result)
            )
        } else{
            const jsonError = yield response.json();
            authorActions.failFetchingAuthor(jsonError);
        }
    }catch (error) {
        console.log(error.message)
    }
}

export function* watchAuthorsFetch() {
    yield takeEvery(
        types.AUTHOR_FETCH_STARTED,
        fetchAuthors
    )
}
