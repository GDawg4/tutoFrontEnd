import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, StyleSheet } from 'react-native';

import LibraryItem from '../LibraryItem';

import * as selectors from '../../reducers';

const Library = ({ books, navigation }) => (
    <View style={styles.container}>
        <FlatList 
            data={books} 
            renderItem={({ item }) => (
                    <LibraryItem book={item} navigation={navigation}/>
                )
            }
            keyExtractor={item => item.id.toString()}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    }
})

export default connect(
    state => ({
        books: selectors.getAllBooks(state)
    })
)(Library);