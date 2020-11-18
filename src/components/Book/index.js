import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import styles from "./styles";
import * as bookActions from '../../actions/books';

import source from '../../assets/logo005.png'


// Componente de libro que se renderiza para mostrar la información de un libro
// Se muestra el título, el autor y el precio
// Al ser presionado redirige a la página del libro
const Book = ({ book, press, navigation, urlComplete=true }) => (
    <View style={styles.bookContainer}>
        <TouchableOpacity onPress={press} style={styles.scrollView}>
            <Image source={source} style={styles.cover}/>
            <View style={styles.bookInfo}>
                <Text numberOfLines={2} style={styles.title}>
                    {book.tutor}
                </Text>
                <Text style={styles.author}>
                    {book.clase}
                </Text>
                <Text style={styles.author}>
                    {book.hora}
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