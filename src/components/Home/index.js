import React, { useEffect } from 'react';
import { View, ScrollView, Text, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import Book from '../Book';
import TagList from '../TagList';

import styles from './styles';
import * as selectors from '../../reducers';
import * as bookActions from '../../actions/books';
import * as authorActions from '../../actions/authors';
import * as tagActions from '../../actions/tags';
import * as transActions from '../../actions/transactions';
import * as authActions from '../../actions/auth'
import TokenRefresh from "../TokenRefresh";


// Pantalla de inicio de la aplicacón
// Se muestran al usuario los libros más nuevos, más vendidos y la oportunidad de buscar por género
const Home = ({ navigation, onLoad, allBooks, allBooks2, allTags, isFetching, allSessions }) => {
    useEffect(onLoad, [])

    return (
        <View style={styles.container}>
            <TokenRefresh/>
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
                <Text style={styles.header}>Tutorías próximas</Text>
                <ScrollView horizontal={true} style={styles.horizontalScroll}>
                    {
                        allSessions.length !== 0 &&
                            allSessions.map(book => <Book key={book.id} book={book} navigation={navigation}/>)
                    }
                </ScrollView>
            </ScrollView>
        </View>
    );
}

export default connect(
    state => ({
        allBooks: selectors.getAllBooks(state).sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date)),
        allBooks2: selectors.getAllBooks(state),
        allTags: selectors.getTags(state),
        isFetching: selectors.getIsFetchingBooks(state),
        allSessions:selectors.getAllSessions(state)
    }),
    dispatch => ({
        onLoad(){
            /*dispatch(authorActions.startFetchingAuthor())
            dispatch(bookActions.startFetchingBook())
            dispatch(tagActions.startFetchingTags())
            dispatch(transActions.startFetchingOwnedBooks())*/
            console.log('yay')
            dispatch(authActions.startFetchingInfo())
        }
    })
)(Home);