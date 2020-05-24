import {
    call,
    takeEvery,
    put,
} from 'redux-saga/effects';
import omit from 'lodash/omit';
  
import * as actions from '../actions/users';
import * as types from '../types/users';
  
  
const API_BASE_URL = 'http://192.168.1.8:8000/api/v1';
  
  
function* addUser(action) {
    try {
        const response = yield call(
            fetch,
            `${API_BASE_URL}/reader/`,
            {
                method: 'POST',
                body: JSON.stringify(action.payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
  
        if (response.status === 201) {
            const { user } = yield response.json();
            yield put(actions.completeAddingUser(omit(user, 'password')));
        } else {
            const { non_field_errors } = yield response.json();
            yield put(actions.failAddingUser(non_field_errors[0]));
        }
    } catch (error) {
        yield put(actions.failAddingUser('Falló la conexión con el API'));
    }
}
  
export function* watchAddUser() {
    yield takeEvery(
        types.USER_ADD_STARTED,
        addUser,
    );
}