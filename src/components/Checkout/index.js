import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, Alert } from 'react-native';
import { Field, reduxForm, formValueSelector } from "redux-form";

import sum from 'lodash/sum';
import round from 'lodash/round';

import Button from '../Button';
import TitleBox from '../TitleBox';

import styles from './styles';
import * as selectors from '../../reducers';
import * as cartActions from '../../actions/cart';

// Maneja el display de error 
const ALERT = {
	shown: true
}

// Pantalla de checkout
// Se muestra al cliente el total de su compra
// Se le da la opción de comprar el libro personalmente o regalarlo a otro usuario
const Checkout = ({ navigation, booksInCart, userExists, userCheckFailed, checkUser, userNameValue, reset, buy, gift }) => {
    useEffect(reset,[])

    if (userCheckFailed && !ALERT.shown) {
		ALERT.shown = true
		Alert.alert('Error en la verificación', 'El usuario ingresado no existe, intente otra vez.')
	}
    
    return (
        <View style = {styles.container}>
            <Text style={styles.header}>Confirmar compra</Text>
            <View style={styles.topContainer}>
                <Text style={styles.text}>Su total es de Q{round(sum(booksInCart.map(book=>parseFloat(book.price))), 2)} </Text>
                <Button label={'Comprar para mí'} onPress={buy}/>
            </View>
            <View style={styles.middleContainer}>
                {
                    userExists 
                    ? 
                        <Text>{userNameValue}</Text>
                    :
                        <Field
                            component={TitleBox}
                            name={'username'}
                            placeholder={'Username you want to give it to'}
                            autoCapitalize='words'
                            returnKeyType='done'
                        />
                }
                {
                    userExists 
                    ? 
                        <Button label={'Regalar'} onPress={gift}/>
                    :
                        <Button label={'Confirmar usuario'} onPress={checkUser}/>
                }
            </View>
        </View>
    )
};

const selector = formValueSelector('checkout');

export default reduxForm({
    form:'checkout'
})(connect(
    state => ({
        booksInCart: selectors.getCart(state).map(book => selectors.getBookByID(state,book)),
        cart: selectors.getCart(state),
        userExists: selectors.getUserExists(state),
        isCheckingUser: selectors.getIsCheckingUser(state),
        userCheckFailed: selectors.getUserCheckFailed(state),
        userNameValue: selector(state, 'username')
    }),
    dispatch => ({
        checkUser(userName){
            dispatch(cartActions.checkCartUser(userName))
        },
        reset(){
            dispatch(cartActions.denyCartUser())
        },
        buy(transaction){
            dispatch(cartActions.startCheckout(transaction))
        },
        gift(transaction, user){
            dispatch(cartActions.startGift(transaction, user))
        }
    }),
    (stateProps, dispatchProps, { navigation })=>({
        booksInCart: stateProps.booksInCart,
        userExists: stateProps.userExists,
        isCheckingUser: dispatchProps.isCheckingUser,
        userCheckFailed: stateProps.userCheckFailed,
        userNameValue: stateProps.userNameValue,
        checkUser(){
            dispatchProps.checkUser(stateProps.userNameValue)
            ALERT.shown = false
        },
        reset(){
            dispatchProps.reset()
        },
        buy(){
            dispatchProps.buy({
                'book': stateProps.cart
            })
            navigation.navigate('Cart')
        },
        gift(){
            dispatchProps.gift(stateProps.cart, stateProps.userNameValue)
            navigation.navigate('Cart')
        }
    })
)(Checkout))
