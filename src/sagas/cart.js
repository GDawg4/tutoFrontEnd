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

import * as constants from '../resources/constants'
import * as types from '../types/cart'
import * as cartActions from '../actions/cart'
import * as selectors from '../reducers'
import * as schemas from "../schemas/cart";

import { API_BASE_URL_ANDROID } from "../resources/constants";

function* checkUserName(action) {
    try{
        const isAuth = select(selectors.isAuthenticated)
        if (isAuth){
            const response = yield call(
                fetch,
                `${constants.API_BASE_URL_ANDROID}/reader/exists/`,
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(action.payload)
                }
            )
            if(response.status === 200){
                yield put(
                    cartActions.confirmCartUser()
                )
            } else {
                yield put(
                    cartActions.denyCartUser()
                )
            }
        }
    }catch (error) {
        console.log(error)
    }
}

export function* watchCheckUserName() {
    yield takeEvery(
        types.CART_USER_CHECK,
        checkUserName
    )
}

function* buy(action) {
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const userID = yield select(selectors.getAuthUserId)
            const response = yield call(
                fetch,
                `${constants.API_BASE_URL_ANDROID}/reader/${userID}/buy/`,
                {
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization':`${token}`
                    },
                    body: JSON.stringify(action.payload.transaction)
                }
            )
            if (response.status === 200){
                console.log('bought')
                yield put(
                    cartActions.confirmCheckout()
                )
            }else{
                cartActions.rejectCheckout()
            }
        }
    }catch (error) {
        console.log(error)
    }
}

export function* watchBuy() {
    yield takeEvery(
        types.CART_CHECKOUT_STARTED,
        buy
    )
}

function* gift(action) {
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const userID = yield select(selectors.getAuthUserId)
            const response = yield call(
                fetch,
                `${constants.API_BASE_URL_ANDROID}/reader/${userID}/gift/`,
                {
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization':`${token}`
                    },
                    body: JSON.stringify(action.payload)
                }
            )
            if (response.status === 200){
                console.log('gifted')
                yield put(
                    cartActions.confirmGift()
                )
            }else{
                cartActions.rejectGift()
            }
        }
    }catch (error) {
        console.log(error)
    }
}

export function* watchGift() {
    yield takeEvery(
        types.CART_GIFT_STARTED,
        gift
    )
}

function* fetchCart(action) {
    try{
        const userID = yield select(selectors.getAuthUserId)
        const token = yield select(selectors.getAuthToken)
        const response = yield call(
            fetch,
            `${constants.API_BASE_URL_ANDROID}/reader/${userID}/cart/`,
            {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`${token}`
                },
            }
        );
        if (response.status === 200){
            const jsonResult = yield response.json();
            console.log(jsonResult)
            const{
                entities: { book },
                result
            } = normalize(jsonResult, schemas.cartListSchema);
            console.log(normalize(jsonResult, schemas.cartListSchema))
            yield put(
                cartActions.confirmFetchCart(result)
            )

        }else{
            const jsonError = yield response.json();
            console.log(jsonError)
        }
    }catch (error) {
        console.log(error)
    }
}

export function* watchCartFetch() {
    yield takeEvery(
        types.CART_FETCH_STARTED,
        fetchCart
    )
}

function* clearCart(action){
    try{
        const userID = yield select(selectors.getAuthUserId)
        const token = yield select(selectors.getAuthToken)
        const response = yield call(
            fetch,
            `${API_BASE_URL_ANDROID}/reader/${userID}/clear-cart`,
            {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`${token}`
                },
            }
        )
        if (response.status === 200){
            yield put(
                cartActions.confirmClearCart()
            )
        }
    }catch (error) {
        console.log(error)
    }
}

export function* watchClearCart() {
    yield takeEvery(
        types.CART_CLEARED,
        clearCart
    )
}

function* addItemToCart(action){
    try{
        const userID = yield select(selectors.getAuthUserId)
        const token = yield select(selectors.getAuthToken)

        console.log(userID)
        console.log(action.payload.book.id)
        console.log(token)
        console.log(JSON.stringify({
            book: action.payload.book.id,
            user: userID
        }));
        

        const response = yield call(
            fetch,
            `${API_BASE_URL_ANDROID}/cart/`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`${token}`,
                },
                body: JSON.stringify({
                    book: action.payload.book.id,
                    user: userID
                })
            }
        )
        if (response.status === 201){
            yield put(
                cartActions.confirmAddToCart(action.payload.book)
            )
        }
    }catch (error) {
        console.log(error)
    }
}

export function* watchAddToCart() {
    yield takeEvery(
        types.CART_ITEM_ADDED,
        addItemToCart
    )
}

function* deleteFromCart(action){
    try {
        const userID = yield select(selectors.getAuthUserId)
        const token = yield select(selectors.getAuthToken)
        
        const response = yield call(
            fetch,
            `${API_BASE_URL_ANDROID}/reader/${userID}/delete-from-cart/`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`${token}`
                },
                body:JSON.stringify({'book':action.payload.book.id})
            }
        )
        if (response.status === 200){
            yield put(
                cartActions.confirmRemoveItemFromCart({'book':action.payload.book.id})
            )
        }
    }catch (error) {
        console.log(error)
    }
}

export function* watchDeleteFromCart() {
    yield takeEvery(
        types.CART_ITEM_REMOVED,
        deleteFromCart
    )
}