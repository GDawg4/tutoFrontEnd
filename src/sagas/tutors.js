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
import * as actions from '../actions/tutors';
import * as types from '../types/tutors';
import * as schemas from '../schemas/tutors';

function* fetchTutors(action) {
    console.log('started')
    try{
        const response = yield call(
            fetch,
            `${constants.API_BASE_URL_ANDROID}/tutors/`,
            {
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            }
        );
        if (response.status === 200){
            console.log('yay2')
            const jsonResult = yield response.json();
            const{
                entities: { tutor },
                result
            } = normalize(jsonResult, schemas.tutorListSchema);

            console.log(normalize(jsonResult, schemas.tutorListSchema))

            yield put(
                actions.completeFetchingTutor(tutor, result)
            )

        }else{
            console.log('yay3')
            const jsonError = yield response.json();
            console.log(jsonError)
        }
    }catch (error) {
        console.log('yay4')
        console.log(error)
    }
}

export function* watchTutorsFetch() {
    yield takeEvery(
        types.TUTOR_FETCH_STARTED,
        fetchTutors
    )
}
