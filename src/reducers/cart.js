import {combineReducers} from "redux";
import includes from 'lodash/includes'
import filter from 'lodash/filter'
import * as types from '../types/cart'
import actions from "redux-form/lib/actions";

const cart = (state = [], action) => {
    switch (action.type) {
        case types.CART_ITEM_ADDED_CONFIRMED :{
            return [...state, action.payload.book.id]
        }
        case types.CART_ITEM_REMOVED_CONFIRMED:{
            return filter(state, book => book !== action.payload.book.book)
        }
        case types.CART_CHECKOUT_COMPLETED:{
            return []
        }
        case types.CART_GIFT_COMPLETED:{
            return []
        }
        case types.CART_CLEARED_CONFIRMED:{
            return []
        }
        case types.CART_FETCH_CONFIRMED:{
            return [...state, ...action.payload]
        }
        default:{
            return state
        }
    }
}

const userExists = (state = false, action) => {
    switch (action.type) {
        case types.CART_USER_CHECK:{
            return false
        }
        case types.CART_USER_CONFIRMED:{
            return true
        }
        case types.CART_USER_DENIED:{
            return false
        }
        default:{
            return state
        }
    }
}

const isCheckingUser = (state = false, action) => {
    switch (action.type) {
        case types.CART_USER_CHECK:{
            return true
        }
        case types.CART_USER_CONFIRMED:{
            return false
        }
        case types.CART_USER_DENIED:{
            return false
        }
        default:{
            return state
        }
    }
}

export default combineReducers({
    cart,
    userExists,
    isCheckingUser
})

export const getCart = state => state.cart;
export const isBookInCart = (state, book) => includes(state.cart, book.id);

export const getUserExists = state => state.userExists

export const getIsCheckingUser = state => state.isCheckingUser