import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

const LibraryItem = ({ book, navigation }) => (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ReadBook')}>
        <View style={styles.imageContainer}>
            <Image source={{uri: `http://192.168.1.8:8000${book.cover_pic}`}} style={styles.image}></Image>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
        </View>
    </TouchableOpacity>
);


export default LibraryItem;