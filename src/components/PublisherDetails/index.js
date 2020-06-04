import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, ScrollView } from 'react-native';

import Book from '../Book';
import OpenLink from '../OpenLink'

import styles from './styles';
import * as selectors from '../../reducers';
import * as publisherActions from '../../actions/publishers';

// página de detalles de la editorial
// muestra la información de la editorial, y los libros publicados por ella
const PublisherDetails = ({ selectedPublisher, publisherBooks, onLoad, navigation }) => {
    useEffect(onLoad, [])

    return(
        <View style={styles.detailsContainer}>
            <View style={styles.topContainer}>
                <Image source={selectedPublisher === undefined ? require('../../assets/default_pp.png') : {uri: selectedPublisher.publisher_pic}} style={styles.publisherPic}/>
                <View style={styles.publisherInfo}>
                    <Text style={styles.name}>{selectedPublisher.name}</Text>
                    <Text style={styles.contact}>{`${selectedPublisher.city}, ${selectedPublisher.country}`}</Text>
                    <OpenLink url={`http://${selectedPublisher.website}`} title={'Website'}></OpenLink>
                </View>
            </View>
            <View style={styles.aboutContainer}>
                <Text style={styles.header}>About</Text>
                <Text style={styles.text}>{selectedPublisher.about}</Text>
            </View>
            <View style={styles.middleContainer}>
                <Text style={styles.header}>Books Published</Text>
                <ScrollView horizontal={true} style={styles.horizontalScroll}>
                    {publisherBooks.map(book => <Book key={book.id} urlComplete={false} book={book} navigation={navigation}/>)}
                </ScrollView>
            </View>
        </View>
    )
};

export default connect(
    state => ({
        selectedPublisher: selectors.selectedPublisher(state),
        publisherBooks: selectors.getPublisherBooks(state),
    }),
    dispatch => ({
        onLoad(){
            dispatch(publisherActions.startFetchingPublisherBooks())
        }
    })
)(PublisherDetails);