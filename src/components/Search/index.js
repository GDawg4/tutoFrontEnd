import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, clearFields } from 'redux-form';
import { Text, View, ScrollView, RefreshControl } from 'react-native';

import lowerCase from 'lodash/lowerCase';

import SearchBox from '../SearchBox';
import Tag from '../Tag';
import Book from '../Book';
import AuthorList from '../AuthorList';
import PublisherList from '../PublisherList';

import styles from './styles';
import * as selectors from '../../reducers';
import * as bookActions from '../../actions/books';
import * as authorActions from '../../actions/authors';
import * as tagActions from '../../actions/tags';
import * as publisherActions from '../../actions/publishers';

// compoonente de búsqueda
// muestra los resultados de libros, autores y editoriales
const Search = ({ navigation, filter, allTags, allBooks, allAuthors, allPubs, handlePress, isFetching, onLoad }) => {
    useEffect(onLoad, [])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Search</Text>
            <Field
                name={'search'}
                component={SearchBox}
                placeholder={'Search books, authors or genres'}
                returnKeyType='done'
                autoCapitalize='words'
                handlePress={handlePress}
            />
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
                {
                    filter === undefined ? 
                        <View style={styles.innerContainer}>
                            <Text style={styles.headerTwo}>Explore</Text>
                            <View style={styles.tagsContainer}>
                                {
                                    allTags.map(genre => 
                                        <Tag key={genre.id} info={genre} vertical={true} navigation={navigation}></Tag>
                                    )
                                }
                            </View>
                        </View> 
                        : 
                        <View style={styles.innerContainer}>
                            <Text style={styles.headerTwo}>Books</Text>
                            <ScrollView horizontal={true} style={styles.booksContainer}>
                                {
                                    allBooks.filter(book => lowerCase(book.title).includes(lowerCase(filter))).length === 0
                                    ?
                                    <Text style={styles.infoMessage}>No hay resultados</Text>
                                    : 
                                    allBooks.filter(book => lowerCase(book.title).includes(lowerCase(filter))).map(book =>
                                        <Book key={book.id} book={book} navigation={navigation}/>
                                    )
                                }
                            </ScrollView>
                            <Text style={styles.headerTwo}>Authors</Text>
                            <AuthorList authors={allAuthors} filter={filter} navigation={navigation}/>
                            <Text style={styles.headerTwo}>Publishers</Text>
                            <PublisherList publishers={allPubs} filter={filter} navigation={navigation}/>
                        </View>
                }
            </ScrollView>
        </View>
    );
};


const selector = formValueSelector('search');

export default reduxForm({
    form: 'search',
})
(connect(
    state => ({
        filter: selector(state, 'search'),
        allTags: selectors.getTags(state),
        allBooks: selectors.getAllBooks(state),
        allAuthors: selectors.getAuthors(state),
        allPubs: selectors.getPublishers(state),
        isFetching: selectors.getIsFetchingBooks(state),
    }),
    dispatch => ({
        handlePress(){
            dispatch(clearFields('search', true, false, ['search']))
        },
        onLoad(){
            dispatch(authorActions.startFetchingAuthor())
            dispatch(bookActions.startFetchingBook())
            dispatch(tagActions.startFetchingTags())
            dispatch(publisherActions.startFetchingPublisher())
        }
    }),
)(Search))