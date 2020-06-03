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

import * as constants from '../resources/constants';
import * as actions from '../actions/notes';
import * as types from '../types/notes';
import * as schemas from '../schemas/notes';
import * as selectors from '../reducers/'

function* fetchNotes(action) {
    try {
        console.log(action.payload)
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const userID = yield select(selectors.getAuthUserId)
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${constants.API_BASE_URL_ANDROID}/reader/${userID}/see-notes/`,
                {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                    body:JSON.stringify(action.payload)
                },
            )
            if (response.status === 200){
                const jsonResult = yield response.json();
                const{
                    entities: { note },
                    result
                } = normalize(jsonResult, schemas.noteListSchema);
                yield put(
                    actions.completeFetchingNotes(note, result)
                )
            }
        }

    }catch(error){
        console.log(error)
        yield put(actions.failFetchingNotes(error))
    }
}

export function* watchFetchNotes() {
    yield takeEvery(
        types.NOTE_FETCH_STARTED,
        fetchNotes
    )
}

function* removeNote(action) {
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
                    actions.completeRemovingNote(action.payload)
                )
            }
        }
    }catch (error) {
        console.log(error)
    }
}

export function* watchRemoveNote() {
    yield takeEvery(
        types.NOTE_REMOVE_STARTED,
        removeNote
    )
}

function* addNote(action) {
    console.log('yay')
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            console.log('yay2')
            const token = yield select(selectors.getAuthToken);
            const userId = yield select(selectors.getAuthUserId);
            console.log(JSON.stringify({
                ...action.payload,
                'user':userId
            }))
            const response = yield call(
                fetch,
                `${constants.API_BASE_URL_ANDROID}/note/`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        ...action.payload,
                        'user':userId
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
                    actions.completeAddingNote(
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

export function* watchAddNote() {
    yield takeEvery(
        types.NOTE_ADD_STARTED,
        addNote,
    );
}