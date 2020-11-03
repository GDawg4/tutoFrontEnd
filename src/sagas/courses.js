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
import * as actions from '../actions/courses';
import * as types from '../types/courses';
import * as schemas from '../schemas/courses';

function* fetchCourses(action) {
    console.log('started')
    try{
        const response = yield call(
            fetch,
            `${constants.API_BASE_URL_ANDROID}/courses/`,
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
                entities: { course },
                result
            } = normalize(jsonResult, schemas.courseListSchema);

            yield put(
                actions.completeFetchingCourse(course, result)
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

export function* watchCoursesFetch() {
    yield takeEvery(
        types.COURSE_FETCH_STARTED,
        fetchCourses
    )
}
