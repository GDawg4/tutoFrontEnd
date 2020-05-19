import * as types from '../types/cart'

export const addItemToCart = (itemID, currentUser, quantity) => ({
    type: types.CART_ITEM_ADDED,
    payload:{
        itemID,
        currentUser,
        quantity
    }
});

export const changeItemInCart = (itemID, currentUser, quantity) => ({
    type: types.CART_ITEM_MODIFIED,
    payload:{
        itemID,
        currentUser,
        quantity
    }
})

export const removeItemFromCart = (itemID, currentUser) => ({
    type: types.CART_ITEM_REMOVED,
    payload:{
        itemID,
        currentUser
    }
});

export const clearCart = (currentUser) => ({
    type: types.CART_CLEARED,
    payload:{
        currentUser
    }
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
