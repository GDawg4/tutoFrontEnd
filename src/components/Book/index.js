import React from 'react';
import { connect } from 'react-redux'
import { Text, View, Image, TouchableOpacity } from 'react-native';

import styles from "./styles";
import * as selectors from '../../reducers'
import * as bookActions from '../../actions/books'

const Book = ({ book, author, press, navigation }) => 
{
    console.log(book.cover_pic)
    return (
        <View style={styles.bookContainer}>
            <TouchableOpacity onPress={press} style={styles.scrollView}>
                <Image source={{uri: book.cover_pic}} style={styles.cover}/>
                <View style={styles.bookInfo}>
                    <Text numberOfLines={2} style={styles.title}>
                        {book.title}
                    </Text>
                    <Text style={styles.author}>
                        {author.name}
                    </Text>
                    <Text style={styles.extra}>
                        {`Q${book.price}`}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
)};

export default connect(
    (state, { book }) => ({
        author: selectors.getAuthor(state, book.author)
    }),
    (dispatch, { book, navigation }) => ({
        press(){
            dispatch(bookActions.selectBook(book.id))
            navigation.navigate('HomeDetails')
        }
    })
) (Book);