import {
    call,
    takeEvery,
    put,
    race,
    all,
    delay,
    select
} from 'redux-saga/effects';
import {normalize} from 'normalizr';

import * as actions from '../actions/sessions';
import * as types from '../types/sessions';
import * as schemas from '../schemas/notes';
import * as selectors from '../reducers/'
import * as constants from "../resources/constants";

function* addNote(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const userId = yield select(selectors.getAuthUserId);
            const response = yield call(
                fetch,
                `${constants.API_BASE_URL_ANDROID}/note/`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        ...action.payload,
                        'student':userId
                    }),
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                console.log('yay3')
                const jsonResult = yield response.json();
                yield put(
                    actions.completeAddingSession(
                        action.payload.id,
                        jsonResult,
                    ),
                );
            } else {
                actions.failFetchingSession('Error')
            }
        }
    } catch (error) {
        actions.failFetchingSession(error)
    }
}

export function* watchAddNote() {
    yield takeEvery(
        types.NOTE_ADD_STARTED,
        addNote,
    );
}