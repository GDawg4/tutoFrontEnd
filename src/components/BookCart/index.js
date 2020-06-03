import React from 'react'
import {connect} from 'react-redux'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import * as actions from '../../actions/cart'

import image from '../../resources/cover.jpg'
import Button from "../Button";

const BookCart = ({book, longPress}) => {
    return(
        <View style = {styles.bookWrapper}>
            <TouchableOpacity onLongPress = {longPress}>
                <Image source={{image}}/>
                <View style = {styles.bookInfo}>
                    <Text style = {styles.book}>{book.title}</Text>
                    <Text style = {styles.author}>{book.author}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bookWrapper:{
        display:'flex',
        flexDirection:'row',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.7)",
        width:'100%',
        backgroundColor: '#FFFFFF',
        height:50,
        alignItems: 'center',
    },
    bookInfo:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        display:'flex',
        flexDirection:'row'
    },
    book:{
        fontWeight:'bold',
        width: '70%'
    },
    author: {
        paddingLeft:10,
        width:'30%'
    }
})

export default connect (
    undefined,
    (dispatch, {book}) => ({
        longPress(){
            dispatch(actions.removeItemFromCart(book))
        }
    })
)(BookCart)