import React from 'react';
import { ScrollView, Text } from 'react-native';

import lowerCase from 'lodash/lowerCase';

import styles from './styles';
import Publisher from '../Publisher';

const PublisherList = ({ publishers, filter, navigation }) => (
    <ScrollView horizontal={true} style={styles.pubsContainer}>
        {
            publishers.filter(publisher => lowerCase(publisher.name).includes(lowerCase(filter))).length === 0
            ?
            <Text style={styles.infoMessage}>No hay resultados</Text>
            : 
            publishers.filter(publisher => lowerCase(publisher.name).includes(lowerCase(filter))).map(publisher =>
                <Publisher key={publisher.id} publisher={publisher} navigation={navigation}/>
            )
        }
    </ScrollView>
);

export default PublisherList;