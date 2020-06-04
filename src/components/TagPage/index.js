import React from 'react';
import { View, ScrollView, Text, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import Book from '../Book';

import styles from './styles';
import * as selectors from '../../reducers';
import * as bookActions from '../../actions/books';

// página de un tag
// se muestra el nombre del tag y los libros bajo ese tag
const TagPage = ({ selectedTag, isFetching, onLoad, allBooks, navigation }) => (
    <View style={styles.container}>
        <ScrollView 
                style={styles.middleContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={() => onLoad()}
                        tintColor='#428AF8'
                    />
                }
        >
            <View style={styles.innerContainer}>
                <Text style={styles.header}>{selectedTag.title}</Text>
                <View style={styles.booksContainer}>
                    {
                        allBooks.filter( book => book.tags.includes(selectedTag.id)).length === 0 
                        ? 
                            <Text style={styles.infoMessage}>No books for this genre</Text>
                        :
                            allBooks.filter( book => book.tags.includes(selectedTag.id)).map(
                                book => <Book key={book.id} book={book} navigation={navigation}/>
                            )
                    }
                </View>
            </View>
        </ScrollView>
    </View>
);


export default connect(
    state => ({
        selectedTag: selectors.selectedTag(state),
        isFetching: selectors.getIsFetchingBooks(state),
        allBooks: selectors.getAllBooks(state)
    }),
    dispatch => ({
        onLoad(){
            dispatch(bookActions.startFetchingBook())
        }
    })
)(TagPage);

