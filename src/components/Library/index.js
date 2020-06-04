import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, RefreshControl } from 'react-native';

import LibraryItem from '../LibraryItem';

import styles from './styles';
import * as selectors from '../../reducers';
import * as transActions from '../../actions/transactions';

// Componente de librería
// FlatList que renderiza los libros comprados por el usuario
const Library = ({ ownedBooks, navigation, isFetching, onLoad }) => {
    useEffect(onLoad, [])
    
    return (
        <View style={styles.container}>
            <FlatList 
                data={ownedBooks} 
                renderItem={({ item }) => (
                        <LibraryItem book={item} navigation={navigation}/>
                    )
                }
                keyExtractor={item => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={() => onLoad()}
                        tintColor='#428AF8'
                    />
                }
            />
        </View>
    )
};


export default connect(
    state => ({
        books: selectors.getAllBooks(state),
        ownedBooks: selectors.getOwnedBooks(state),
        isFetching: selectors.isFetchingTrans(state),
    }),
    dispatch => ({
        onLoad(){
            dispatch(transActions.startFetchingTransaction())
            dispatch(transActions.startFetchingOwnedBooks())
        }
    })
)(Library);