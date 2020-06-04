import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, ScrollView } from 'react-native';

import Book from '../Book';

import styles from './styles';
import * as selectors from '../../reducers';
import * as authorActions from '../../actions/authors';


// Pantalla donde se muestran los detalles del autor.
// Nombre, biografía y los libors escritos por el/ella
const AuthorDetails = ({ selectedAuthor, authorBooks, onLoad, navigation }) => {
    useEffect(onLoad, [])

    return(
        <View style={styles.detailsContainer}>
            <View style={styles.topContainer}>
                <Image source={selectedAuthor === undefined ? require('../../assets/default_pp.png') : {uri: selectedAuthor.author_pic}} style={styles.authorPic}/>
                <View style={styles.authorInfo}>
                    <Text style={styles.name}>{selectedAuthor ? selectedAuthor.name : ''}</Text>
                    <Text style={styles.bio}>{selectedAuthor ? selectedAuthor.bio : ''}</Text>
                </View>
            </View>
            <View style={styles.middleContainer}>
                <Text style={styles.header}>Books by the Author</Text>
                <ScrollView horizontal={true} style={styles.horizontalScroll}>
                    {authorBooks.map(book => <Book key={book.id} urlComplete={false} book={book} navigation={navigation}/>)}
                </ScrollView>
            </View>
        </View>
    )};

export default connect(
    state => ({
        selectedAuthor: selectors.selectedAuthor(state),
        authorBooks: selectors.getAuthorBooks(state),
    }),
    dispatch => ({
        onLoad(){
            dispatch(authorActions.startFetchingAuthorBooks())
        }
    })
)(AuthorDetails);