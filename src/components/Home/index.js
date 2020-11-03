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
import TokenRefresh from "../TokenRefresh";
import {ImageBackground} from "react-native-web";
import cit from '../../assets/CIT.jpg';
import cafeteria from "../../assets/cafeteria.jpg";



// Home screen of the app
// Here you can navigate to your profile, finding a tutor, or look at your previous and future appointments

const Home = ({ navigation, onLoad, allBooks, allBooks2, allTags, isFetching }) => {
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
                <Text style={styles.header}>Tutorías próximas</Text>
                <ScrollView horizontal={true} style={styles.horizontalScroll}>
                    {
                        !isFetching &&
                        allBooks.map(book => <Book key={book.id} book={book} navigation={navigation}/>)
                    }
                </ScrollView>
                <Text style={styles.header}>Tutorías pasadas</Text>
                <ScrollView horizontal={true} style={styles.horizontalScroll}>
                    {
                        !isFetching &&
                        allBooks2.map(book => <Book key={book.id} book={book} navigation={navigation}/>)
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
    }),
    dispatch => ({
        onLoad(){
            /*dispatch(authorActions.startFetchingAuthor())
            dispatch(bookActions.startFetchingBook())
            dispatch(tagActions.startFetchingTags())
            dispatch(transActions.startFetchingOwnedBooks())*/
            console.log('yay')
        }
    })
)(Home);