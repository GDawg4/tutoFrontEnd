import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const LibraryItem = ({ book, navigation }) => (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ReadBook')}>
        <View style={styles.imageContainer}>
            <Image source={{uri: book.cover_pic}} style={styles.image}></Image>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: Dimensions.get('window').width,
        padding: 8,
        flexDirection: 'row',
        marginBottom: 8
    },
    imageContainer: {
        flex: 1,
    },
    infoContainer: {
        flex: 2
    },
    image: {
        width: 100, 
        height: 150, 
        resizeMode: 'cover', 
        borderRadius: 8
    },
    title: {
        fontSize: 18,
        fontWeight: '600'
    },
    author: {
        fontSize: 16,
        fontWeight: '500'
    }
})

export default LibraryItem;