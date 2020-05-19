import {combineReducers} from "redux";

import * as types from '../types/cart'

const byId = (state = {}, action) => {
    switch (action.type) {
        case types.CART_ITEM_ADDED:{
            return {
                ...state
            }
        }
    }
}