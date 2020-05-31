import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, clearFields } from 'redux-form';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

import lowerCase from 'lodash/lowerCase';

import SearchBox from '../SearchBox';
import Tag from '../Tag';
import Book from '../Book';

import * as selectors from '../../reducers';

const Search = ({ navigation, filter, allTags, allBooks, handlePress }) => {

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
            <ScrollView style={styles.middleContainer}>
                {
                    filter === undefined ? 
                        <View style={styles.innerContainer}>
                            <Text style={styles.headerTwo}>Explore</Text>
                            <View style={styles.tagsContainer}>
                                {
                                    allTags.map(genre => 
                                        <Tag key={genre} info={genre} vertical={true} navigation={navigation}></Tag>
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
                            <Text style={styles.headerTwo}>Genres</Text>
                        </View>
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {    
        flex: 1, 
        paddingTop: 64,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    header: {
        alignSelf: 'flex-start',
        paddingLeft: '5%',
        color: '#428AF8',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'center',
    },
    headerTwo: {
        alignSelf: 'flex-start',
        color: '#428AF8',
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center',
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
    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    booksContainer: {
        paddingLeft: 16,
        flex: 1,
        flexWrap: 'wrap',
        width: '100%'
    },
    infoMessage: {
        alignSelf: 'flex-start',
        color: '#BEBEBE',
        fontSize: 14,
        marginBottom: 32,
        marginTop: 16,
        textAlign: 'center',
    }
});

const selector = formValueSelector('search');

export default reduxForm({
    form: 'search',
})
(connect(
    state => ({
        filter: selector(state, 'search'),
        allTags: selectors.getTags(state),
        allBooks: selectors.getAllBooks(state),
    }),
    dispatch => ({
        handlePress(){
            dispatch(clearFields('search', true, false, ['search']))
        }
    }),
)(Search))