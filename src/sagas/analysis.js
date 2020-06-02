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
import * as types from '../types/analysis'
import * as actions from '../actions/analysis'
import * as schemas from '../schemas/analysis'
import {normalize} from "normalizr";

function* fetchAnalysis(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if (isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${constants.API_BASE_URL_ANDROID}/analysis`,
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
                    entities: { analysis },
                    result
                } = normalize(jsonResult, schemas.analysisListSchema);
                yield put(
                    actions.completeFetchingAnalysis(
                        action.payload.id,
                        jsonResult,
                    ),
                );
                yield put(
                    actions.completeFetchingAnalysis(analysis, result)
                )
            } else {
                console.log('nel')
            }
        }
    }catch (error) {
        yield put(
            actions.failFetchingAnalysis(error)
        )
    }
}

export function* watchFetchAnalysis() {
    yield takeEvery(
        types.ANALYSIS_FETCH_STARTED,
        fetchAnalysis
    )
}

function* addAnalysis(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const userId = yield select(selectors.getAuthUserId);
            const response = yield call(
                fetch,
                `${constants.API_BASE_URL_ANDROID}/analysis/`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        ...action.payload,
                        'analysis':userId
                    }),
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                const jsonResult = yield response.json();
                yield put(
                    actions.completeAddingAnalysis(
                        action.payload.id,
                        jsonResult,
                    ),
                );
            } else {
                console.log('nel')
            }
        }
    } catch (error) {
        console.log("ERROR", error)
    }
}

export function* watchAddAnalysis() {
    yield takeEvery(
        types.ANALYSIS_ADD_STARTED,
        addAnalysis,
    );
}