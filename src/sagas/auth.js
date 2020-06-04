import {
    call,
    takeEvery,
    put,
    select,
} from 'redux-saga/effects';
  
import * as constants from '../resources/constants';
import * as actions from '../actions/auth';
import * as types from '../types/auth';
import * as selectors from '../reducers';
  
  
function* login(action) {
    console.log('yay1')
    try {
        console.log('yay2')
        const response = yield call(
            fetch,
            `${constants.API_BASE_URL_ANDROID}/token-auth/`,
            {
                method: 'POST',
                body: JSON.stringify(action.payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
  
        if (response.status === 200) {
            const { token } = yield response.json();
            yield put(actions.completeLogin(token));
        } else {
            console.log('yay3')
            const { non_field_errors } = yield response.json();
            yield put(actions.failLogin(non_field_errors[0]));
        }
    } catch (error) {
        yield put(actions.failLogin('Error en el login. Compruebe su conexión a internet.'));
    }
}
  
export function* watchLoginStarted() {
    yield takeEvery(
        types.AUTHENTICATION_STARTED,
        login,
    );
}
  
function* refreshToken(action) {
    const expiration = yield select(selectors.getAuthExpiration);
    const now = parseInt(new Date().getTime() / 1000, 10)
  
    if(expiration - now < 3000){
        try {
            const response = yield call(
                fetch,
                `${constants.API_BASE_URL_ANDROID}/token-refresh/`,
                {
                    method: 'POST',
                    body: JSON.stringify(action.payload),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
  
            if (response.status === 200) {
                const { token } = yield response.json();
                yield put(actions.completeTokenRefresh(token));
            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failLogin(non_field_errors[0]));
            }
  
        } catch (error) {
            yield put(actions.failTokenRefresh(error.toString()))
        }
    }
}
  
export function* watchRefreshTokenStarted() {
    yield takeEvery(
        types.TOKEN_REFRESH_STARTED,
        refreshToken,
    )
}