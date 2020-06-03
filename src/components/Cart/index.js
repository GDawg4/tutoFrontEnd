import React, {useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import {connect} from 'react-redux'

import Button from "../Button";
import BookCart from "../BookCart";
import * as selectors from '../../reducers'
import * as cartActions from '../../actions/cart'
import cart from "../../reducers/cart";
import * as authorActions from "../../actions/authors";
import * as bookActions from "../../actions/books";
import * as tagActions from "../../actions/tags";

const Cart = ({navigation, booksInCart, checkout, clear, onLoad}) => {
    useEffect(onLoad, [])
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your cart</Text>
            <ScrollView>
                {booksInCart.map(book => <BookCart key={book.id} book={book}/> )}
            </ScrollView>
            <Button label={'Checkout'} disabled={booksInCart.length === 0} onPress={checkout}/>
            <Button label={'Clear'} disabled={booksInCart.length === 0} onPress={clear}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:'10%',
        width:'90%',
        marginLeft:'5%'
    },
    header: {
        alignSelf: 'flex-start',
        color: '#428AF8',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 8
    },
})

export default connect(
    state => ({
        booksInCart:selectors.getCart(state).map(book => selectors.getBookByID(state,book))
    }),
    (dispatch, {navigation}) =>({
        checkout(){
            navigation.navigate('Checkout')
        },
        clear(){
            console.log('clicked')
            dispatch(cartActions.clearCart())
        },
        onLoad(){
            dispatch(cartActions.startFetchingCart())
        }
    })
)
(Cart);