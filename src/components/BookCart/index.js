import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './styles';
import * as actions from '../../actions/cart';

// Elemento individual del cart
const BookCart = ({ book, longPress }) => {
    return(
        <TouchableOpacity style={styles.container} onLongPress = {longPress}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: book.cover_pic }} style={styles.image}/>
            </View>
            <View style={styles.bookInfo}>
                <Text style = {styles.book}>{book.title}</Text>
                <Text style = {styles.author}>{book.author}</Text>
            </View>
        </TouchableOpacity>
    )
};

export default connect (
    undefined,
    (dispatch, { book }) => ({
        longPress(){
            dispatch(actions.removeItemFromCart(book))
        }
    })
)(BookCart)