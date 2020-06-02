import React from 'react';
import { ScrollView, Text } from 'react-native';

import lowerCase from 'lodash/lowerCase';

import styles from './styles';
import Author from '../Author';

const AuthorList = ({ authors, filter, navigation }) => (
    <ScrollView horizontal={true} style={styles.authorsContainer}>
        {
            authors.filter(author => lowerCase(author.name).includes(lowerCase(filter))).length === 0
            ?
            <Text style={styles.infoMessage}>No hay resultados</Text>
            : 
            authors.filter(author => lowerCase(author.name).includes(lowerCase(filter))).map(author =>
                <Author key={author.id} author={author} navigation={navigation}/>
            )
        }
    </ScrollView>
);

export default AuthorList;