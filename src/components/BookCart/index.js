import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'

import Button from "../Button";

const BookCart = ({book}) => {
    return(
        <View style = {styles.bookWrapper}>
            <Image/>
            <View style = {styles.bookInfo}>
                <Text>{book.title}</Text>
                <Text>X</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bookWrapper:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        display:'flex',
        flexDirection:'row'
    },
    bookInfo:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        display:'flex',
        flexDirection:'row'
    }
})

export default BookCart