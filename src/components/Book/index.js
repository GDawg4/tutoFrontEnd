import React from 'react';
import { connect } from 'react-redux'
import { Text, View, Image, TouchableOpacity } from 'react-native';

import styles from "./styles";
import * as selectors from '../../reducers'
import * as bookActions from '../../actions/books'

const Book = ({ book, press, author, navigation }) => (
    <View style={styles.bookContainer}>
        <TouchableOpacity onPress={press} style={styles.scrollView}>
            <View className='book-info'>
                <Image source={require('../../assets/logo.jpg')} style={styles.cover}/>
                <View style={styles.bookInfo}>
                    <Text style={styles.title}>
                        {book.title}
                    </Text>
                    <Text style={styles.author}>
                        {author.name}
                    </Text>
                    <Text style={styles.extra}>
                        {`$${book.price}`}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>
);

export default connect(
    (state, {book}) => ({
        author:selectors.getAuthor(state, book.author)
    }),
    (dispatch, {book, navigation}) => ({
        press(){
            dispatch(bookActions.selectBook(book))
            navigation.navigate('HomeDetails')
        }
    })
) (Book);