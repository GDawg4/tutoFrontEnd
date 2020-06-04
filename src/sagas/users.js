import {
    call,
    takeEvery,
    put,
} from 'redux-saga/effects';
import omit from 'lodash/omit';
  
import * as actions from '../actions/users';
import * as types from '../types/users';
import * as constants from '../resources/constants'
  
  
const API_BASE_URL = 'http://192.168.1.8:8000/api/v1';
  
  
function* addUser(action) {
    try {
        const response = yield call(
            fetch,
            `${constants.API_BASE_URL_ANDROID}/reader/`,
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
            const result = yield response.json();
            yield put(actions.failAddingUser(result.email ? 'Ya existe un usuario asociado a este correo electrónico' : 'Conexión fallida, compruebe su conexión a internet'));
        }
    } catch (error) {
        yield put(actions.failAddingUser(error.toString()));
    }
}
  
export function* watchAddUser() {
    yield takeEvery(
        types.USER_ADD_STARTED,
        addUser,
    );
}