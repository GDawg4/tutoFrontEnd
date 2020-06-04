import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import styles from './styles';
import * as publisherActions from '../../actions/publishers';

// componente que muestra los datos de una editorial luego de una búsqueda
// navega hacia la página de la editorial cuando es presionada
const Publisher = ({ publisher, press }) => (
    <View style={styles.publisherContainer}>
        <TouchableOpacity onPress={press} style={styles.scrollView}>
            <Image source={{uri: publisher.publisher_pic}} style={styles.publisherPic}/>
            <View style={styles.publisherInfo}>
                <Text numberOfLines={2} style={styles.name}>
                    {publisher.name}
                </Text>
            </View>
        </TouchableOpacity>
    </View>
);

export default connect(
    undefined,
    (dispatch, { publisher, navigation }) => ({
        press(){
            dispatch(publisherActions.selectPublisher(publisher.id))
            navigation.navigate('PublisherDetails')
        }
    })
)(Publisher);