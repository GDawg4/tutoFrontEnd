import React from 'react';
import { Text, View } from 'react-native';
import {connect} from 'react-redux'

import Button from "../Button";
import BookCart from "../BookCart";
import * as selectors from '../../reducers'

const Cart = ({booksInCart}) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {booksInCart.length === 0 ? <Text>No has agregado libros a tu carro</Text>:
                booksInCart.map(book=><BookCart key={book.id} book={book}/>)
            }
            <Button label={'Checkout'} disabled={false}/>
        </View>
    );
}

export default connect(
    state => ({
        booksInCart:selectors.getCart(state).map(book => selectors.getBookByID(state,book))
    }),
    undefined
)
(Cart);