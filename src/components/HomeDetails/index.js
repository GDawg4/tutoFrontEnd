import React from 'react';
import { View } from 'react-native';
import {connect} from 'react-redux'

import Book from '../Book';
import Button from '../Button'
import * as selectors from '../../reducers'
import * as bookActions from '../../actions/books'
import * as cartActions from '../../actions/cart'
import {Text} from "react-native";
import actions from "redux-form/lib/actions";

const HomeDetails = ({ navigation, back, selectedBook, hasBookInCart, addToCart, removeFromCart }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{selectedBook.title}</Text>
            {!hasBookInCart ? <Button label='Agregar al carrito' onPress={() => addToCart()}/>:
                <Button label='Retirar del carrito' onPress={() => removeFromCart()}/>
            }
            <Button label="Regresar" onPress={() => back()}/>
        </View>
    );
}

export default connect(
    (state)=>({
        selectedBook:selectors.getSelectedBook(state),
        hasBookInCart:selectors.getIsBookInCart(state, selectors.getSelectedBook(state))
    }),
    (dispatch, {navigation})=>({
        back(){
            dispatch(bookActions.deselectBook());
            navigation.navigate('Home')
        },
        addToCart(selectedBook){
            console.log(selectedBook)
            dispatch(cartActions.addItemToCart(selectedBook,1))
        },
        removeFromCart(selectedBook){
            dispatch(cartActions.removeItemFromCart(selectedBook))
        },
    }),
    (stateProps, dispatchProps)=>({
        selectedBook:stateProps.selectedBook,
        hasBookInCart:stateProps.hasBookInCart,
        back:dispatchProps.back,
        addToCart(){
            dispatchProps.addToCart(stateProps.selectedBook)
        },
        removeFromCart(){
            dispatchProps.removeFromCart(stateProps.selectedBook)
        }
    })
)(HomeDetails);