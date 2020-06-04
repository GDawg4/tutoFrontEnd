import React, { useEffect, useLayoutEffect } from 'react';
import { Text, View, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

import Button from "../Button";
import BookCart from "../BookCart";

import styles from './styles';
import * as selectors from '../../reducers';
import * as cartActions from '../../actions/cart';
import * as authActions from '../../actions/auth';

// Componente de carrito
// Se mapean todos los items dentro del cart para renderizar cada elemento por separado
const Cart = ({ navigation, booksInCart, checkout, clear, onLoad, logOut, loggedOut, isBuying }) => {
    useEffect(onLoad, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <AntDesign 
                    name="logout" 
                    size={20} 
                    color="#F55E64" 
                    style={{ marginRight: 16 }}
                    onPress={() => 
                        Alert.alert(
                            'Log Out?',
                            'You´re about to exit the app.',
                            [
                                {
                                    text: 'Stay', 
                                    style: 'cancel'
                                },
                                {
                                    text: 'Log Out',
                                    onPress: () => logOut(),
                                    style: 'destructive'
                                }
                            ],
                            {
                                cancelable: true,
                            },
                        )
                    }
                />
            )
        })
    })

    if (loggedOut) {
		return(
			<Redirect to="/"/>
		)
	}

    return (
        <View style={[styles.container, isBuying ? styles.buying : styles.none]}>
            {
                booksInCart.length === 0 && (
                    <Text style={styles.infoMessage}>Tu carrito esta vacío...</Text>
                )
            }
            <ScrollView style={{width: '100%'}}>
                {booksInCart.map(book => <BookCart key={book.id} book={book}/> )}
            </ScrollView>
            <View style={styles.buttonsContainer}>
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
            {
				isBuying && (
				    <View style={styles.spinner}>
						<ActivityIndicator size="large" color="#428AF8" />
					</View>
				)
			}
        </View>
    )
}


export default connect(
    state => ({
        booksInCart: selectors.getCart(state).map(book => selectors.getBookByID(state,book)),
        loggedOut: selectors.getAuthToken(state) === null,
        isBuying: selectors.getIsBuying(state),
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
        },
        logOut(){
            dispatch(authActions.logout())
        }
    })
)
(Cart);