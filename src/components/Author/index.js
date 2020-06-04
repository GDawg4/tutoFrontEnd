import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import styles from './styles';
import * as authorActions from '../../actions/authors';

// Elemento que se muestra en los resultados de búsqueda para autores
// Redirige a la página del autor al ser presionado
const Author = ({ author, press }) => (
    <View style={styles.authorContainer}>
        <TouchableOpacity onPress={press} style={styles.scrollView}>
            <Image source={{uri: author.author_pic}} style={styles.authorPic}/>
            <View style={styles.authorInfo}>
                <Text numberOfLines={2} style={styles.name}>
                    {author.name}
                </Text>
            </View>
        </TouchableOpacity>
    </View>
);

export default connect(
    undefined,
    (dispatch, { author, navigation }) => ({
        press(){
            dispatch(authorActions.selectAuthor(author.id))
            navigation.navigate('AuthorDetails')
        }
    })
)(Author);