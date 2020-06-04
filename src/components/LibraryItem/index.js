import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './styles';
import * as transActions from '../../actions/transactions';

const LibraryItem = ({ book, readBook, navigation }) => (
    <TouchableOpacity style={styles.container} onPress={() => readBook(book.book_content)}>
        <View style={styles.imageContainer}>
            <Image source={{uri: `http://192.168.1.8:8000${book.cover_pic}`}} style={styles.image}></Image>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
        </View>
    </TouchableOpacity>
);


export default connect(
    undefined, 
    (dispatch, { navigation }) => ({
        readBook(source){
            navigation.navigate('ReadBook')
            dispatch(transActions.readBook(source))
        }
    })
)(LibraryItem);