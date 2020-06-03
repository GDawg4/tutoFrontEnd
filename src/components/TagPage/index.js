import React, { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import Book from '../Book';
import Button from '../Button';

import * as selectors from '../../reducers';
import * as bookActions from '../../actions/books';
import * as authorActions from '../../actions/authors';
import * as tagActions from '../../actions/tags';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    middleContainer: {
        flex: 3,
        paddingTop: 16,
        width: '90%',
        marginBottom: 16,
    },
    innerContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    header: {
        alignSelf: 'center',
        color: '#428AF8',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'center',
    },
    booksContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    infoMessage: {
        alignSelf: 'flex-start',
        color: '#BEBEBE',
        fontSize: 14,
        marginBottom: 32,
        marginTop: 16,
        textAlign: 'center',
    },
})

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

