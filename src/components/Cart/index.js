import React, {useEffect} from 'react';
import { Text, View, Alert, ScrollView } from 'react-native';
import {connect} from 'react-redux'

import Button from "../Button";
import BookCart from "../BookCart";

import styles from './styles';
import * as selectors from '../../reducers';
import * as cartActions from '../../actions/cart';

// Componente de carrito
// Se mapean todos los items dentro del cart para renderizar cada elemento por separado
const Cart = ({ navigation, booksInCart, checkout, clear, onLoad }) => {
    useEffect(onLoad, [])

    return (
        <View style={styles.container}>
            <ScrollView style={{width: '100%'}}>
                {booksInCart.map(book => <BookCart key={book.id} book={book}/> )}
            </ScrollView>
            <Button label={'Checkout'} disabled={booksInCart.length === 0} onPress={checkout}/>
            <Button 
                label={'Clear'} 
                disabled={booksInCart.length === 0} 
                onPress={() => 
                    Alert.alert(
                        'Empty Cart?',
                        'This action cannot be reverted',
                        [
                            {
                                text: 'Cancel', 
                                style: 'cancel'
                            },
                            {
                                text: 'Clear',
                                onPress: () => clear(),
                                style: 'destructive'
                            }
                        ],
                        {
                            cancelable: true,
                        },
                    )
                }
            />
        </View>
    )
}


export default connect(
    state => ({
        booksInCart: selectors.getCart(state).map(book => selectors.getBookByID(state,book))
    }),
    (dispatch, {navigation}) =>({
        checkout(){
            navigation.navigate('Checkout')
        },
        clear(){
            dispatch(cartActions.clearCart())
        },
        onLoad(){
            dispatch(cartActions.startFetchingCart())
        }
    })
)
(Cart);