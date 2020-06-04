import * as types from '../types/cart'
import transactions from "../reducers/transactions";

export const addItemToCart = (book) => ({
    type: types.CART_ITEM_ADDED,
    payload: {
        book
    }
});

export const confirmAddToCart = (book) => ({
    type:types.CART_ITEM_ADDED_CONFIRMED,
    payload:{
        book
    }
})

export const changeItemInCart = (book, currentUser, quantity) => ({
    type: types.CART_ITEM_MODIFIED,
    payload:{
        book,
        quantity,
        currentUser,
    }
})

export const removeItemFromCart = (book) => ({
    type: types.CART_ITEM_REMOVED,
    payload:{
        book
    }
});

export const confirmRemoveItemFromCart = (book) => ({
    type: types.CART_ITEM_REMOVED_CONFIRMED,
    payload: {
        book
    }
})

export const clearCart = () => ({
    type: types.CART_CLEARED
});

export const confirmClearCart = () => ({
    type: types.CART_CLEARED_CONFIRMED
});

export const checkCode = (code, currentUser) => ({
    type: types.CODE_USED,
    payload:{
        code,
        currentUser
    }
});

export const useCode = (code, currentUser) => ({
    type: types.CODE_APPROVED,
    payload:{
        code,
        currentUser
    }
});

export const rejectCode = (code, currentUser) => ({
    type: types.CODE_REJECTED,
    payload:{
        code,
        currentUser
    }
})

export const checkoutCart = (currentUser) => ({
    type: types.CART_CHECKOUT,
    payload:{
        currentUser
    }
})

export const checkCartUser = (userToCheck) => ({
    type:types.CART_USER_CHECK,
    payload:{
        userToCheck
    }
})

export const confirmCartUser = () => ({
    type:types.CART_USER_CONFIRMED,
})

export const denyCartUser = () => ({
    type: types.CART_USER_DENIED,
})

export const startCheckout = (transaction) =>({
    type:types.CART_CHECKOUT_STARTED,
    payload:{
        transaction
    }
})

export const confirmCheckout = () => ({
    type:types.CART_CHECKOUT_COMPLETED
})

export const rejectCheckout = () => ({
    type:types.CART_CHECKOUT_REJECTED
})

export const startGift = (books, username) =>({
    type:types.CART_GIFT_STARTED,
    payload:{
        books,
        username
    }
})

export const confirmGift = () => ({
    type:types.CART_GIFT_COMPLETED
})

export const rejectGift = () => ({
    type:types.CART_GIFT_REJECTED
})

export const startFetchingCart = () => ({
    type:types.CART_FETCH_STARTED
})

export const confirmFetchCart = (newItems) => ({
    type:types.CART_FETCH_CONFIRMED,
    payload:newItems
})



