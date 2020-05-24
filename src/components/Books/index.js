import React from 'react';
import { View, Button } from "react-native";
import { connect } from 'react-redux';

import * as bookActions from '../../actions/books';
import * as selectors from '../../reducers';

import Book from "../Book";


const Books = ({ books }) =>(
    <View>
        {
            books.map(book => <Book key={book.id} title={book.title} author={book.author} price={'0.99'}/>)
        }
    </View>
);

export default connect(
    state => ({
        books: selectors.getAllBooks(state)
    }),
    undefined,
)(Books);