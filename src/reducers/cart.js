import {combineReducers} from "redux";
import includes from 'lodash/includes'
import filter from 'lodash/filter'
import * as types from '../types/cart'

const cart = (state = [], action) => {
    switch (action.type) {
        case types.CART_ITEM_ADDED :{
            return [...state, action.payload.book.id]
        }
        case types.CART_ITEM_REMOVED:{
            return filter(state, book => book !== action.payload.book.id)
        }
        default:{
            return state
        }
    }
}

export default combineReducers({
    cart
})

export const getCart = state => state.cart;
export const isBookInCart = (state, book) => includes(state.cart, book.id);