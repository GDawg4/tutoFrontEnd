import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Text, View, ScrollView, StyleSheet} from 'react-native'
import {Form, Field, reduxForm, formValueSelector} from "redux-form";
import sum from 'lodash/sum'
import round from 'lodash/round'

import Button from "../Button";
import TitleBox from "../TitleBox";
import * as selectors from "../../reducers";
import * as cartActions from '../../actions/cart'

const Checkout = ({navigation, booksInCart, userExists, isCheckingUser, checkUser, userNameValue, reset, buy, gift}) => {
    useEffect(reset,[])
    return (
    <View style = {styles.container}>
        <Text>Confirmar compra</Text>
        <Text>Su total es de Q{round(sum(booksInCart.map(book=>parseFloat(book.price))), 2)} </Text>
        <Button label={'Comprar para mí'} onPress={buy}/>
        {userExists ? <Text>{userNameValue}</Text>:<Field
            component={TitleBox}
            name={'username'}
            placeholder={'Write here the name of the username you want to give it to'}
            multiline={false}
            autoCapitalize='words'
            returnKeyType='done'/>}
        {userExists ? <Button label={'Regalar'} onPress={gift}/>:<Button label={'Confirmar usuario'} onPress={checkUser}/>}
    </View>
)}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:'10%',
        width:'90%',
        marginLeft:'5%'
    },
})

const selector = formValueSelector('checkout')

export default reduxForm({
    form:'checkout'
})(connect(
    state => ({
        booksInCart:selectors.getCart(state).map(book => selectors.getBookByID(state,book)),
        cart:selectors.getCart(state),
        userExists:selectors.getUserExists(state),
        isCheckingUser:selectors.getIsCheckingUser(state),
        userNameValue:selector(state, 'username')
    }),
    (dispatch) => ({
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
    (stateProps, dispatchProps, {navigation})=>({
        booksInCart:stateProps.booksInCart,
        userExists:stateProps.userExists,
        isCheckingUser:dispatchProps.isCheckingUser,
        userNameValue:stateProps.userNameValue,
        checkUser(){
            dispatchProps.checkUser(stateProps.userNameValue)
        },
        reset(){
            dispatchProps.reset()
        },
        buy(){
            dispatchProps.buy({
                'book':stateProps.cart
            })
            navigation.navigate('Cart')
        },
        gift(){
            dispatchProps.gift(stateProps.cart, stateProps.userNameValue)
            navigation.navigate('Cart')
        }
    })
)(Checkout))
