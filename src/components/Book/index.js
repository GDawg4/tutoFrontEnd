import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import styles from "./styles";
import * as bookActions from '../../actions/books';
import * as constants from '../../resources/constants';


// Componente de libro que se renderiza para mostrar la información de un libro
// Se muestra el título, el autor y el precio
// Al ser presionado redirige a la página del libro
const Book = ({ book, press, navigation, urlComplete=true }) => (
    <View style={styles.bookContainer}>
        <TouchableOpacity onPress={press} style={styles.scrollView}>
            <Image source={{uri: urlComplete ? book.cover_pic : constants.MEDIA_BASE_URL+book.cover_pic}} style={styles.cover}/>
            <View style={styles.bookInfo}>
                <Text numberOfLines={2} style={styles.title}>
                    {book.title}
                </Text>
                <Text style={styles.author}>
                    {book.author}
                </Text>
                <Text style={styles.extra}>
                    {`Q${book.price}`}
                </Text>
            </View>
        </TouchableOpacity>
    </View>
);

export default connect(
    undefined,
    (dispatch, { book, navigation }) => ({
        press(){
            dispatch(bookActions.selectBook(book.id))
            navigation.navigate('HomeDetails')
        }
    })
)(Book);