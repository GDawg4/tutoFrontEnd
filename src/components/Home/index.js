import React, { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import Book from '../Book';
import Button from '../Button';
import TagList from '../TagList';

import * as selectors from '../../reducers';
import * as bookActions from '../../actions/books';
import * as authorActions from '../../actions/authors';
import * as tagActions from '../../actions/tags';

const Home = ({ navigation, onLoad, allBooks, allTags, isFetching }) => {
    useEffect(onLoad, [])
    return (
        <View style={styles.container}>
            <ScrollView 
                style={styles.homeContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={() => onLoad()}
                        tintColor='#428AF8'
                    />
                }
            >
                <Text style={styles.header}>New Releases</Text>
                <ScrollView horizontal={true} style={styles.horizontalScroll}>
                    {allBooks.map(book => <Book key={book.id} book={book} navigation={navigation}/>)}
                </ScrollView>
                <Text style={styles.header}>Fantasy</Text>
                <ScrollView horizontal={true} style={styles.horizontalScroll}>
                    {allBooks.map(book => <Book key={book.id} book={book} navigation={navigation}/>)}
                </ScrollView>
                <Text style={styles.header}>Shop by Genre</Text>
                <TagList allTags={allTags} navigation={navigation}/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF'
    },
    homeContainer: {
        width: '100%'
    },
    horizontalScroll: {
        paddingLeft: 16,
        flex: 1,
        flexWrap: 'wrap'
    },
    header: {
        alignSelf: 'flex-start',
        color: '#428AF8',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 8,
        marginLeft: 16,
        fontWeight: '700'
    },
})

export default connect(
    state => ({
        allBooks: selectors.getAllBooks(state),
        allTags: selectors.getTags(state),
        isFetching: selectors.getIsFetchingBooks(state)
    }),
    dispatch => ({
        onLoad(){
            dispatch(authorActions.startFetchingAuthor())
            dispatch(bookActions.startFetchingBook())
            dispatch(tagActions.startFetchingTags())
        }
    })
)(Home);