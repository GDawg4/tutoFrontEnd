import React, {useEffect} from 'react';
import { View, ScrollView } from 'react-native';
import {connect} from 'react-redux'

import Book from '../Book';
import Button from "../Button";
import * as selectors from '../../reducers'
import * as bookActions from '../../actions/books'
import * as authorActions from '../../actions/authors'
import * as transactionActions from '../../actions/transactions'
import {Text} from "react-native-web";

const Home = ({ navigation, onLoad, allBooks }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView>
                {allBooks.map(book => <Book key={book.id} book={book} navigation={navigation}/>)}
            </ScrollView>
            <Button label={'Refresh'} onPress={onLoad}/>
        </View>
    );
}

export default connect(
    (state)=>({
        allBooks:selectors.getAllBooks(state)
    }),
    (dispatch)=>({
        onLoad(){
            dispatch(bookActions.startFetchingBook())
            dispatch(authorActions.startFetchingAuthor())
        }
    })
)(Home);