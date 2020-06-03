import React from 'react'
import {connect} from 'react-redux'
import {Text, View, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';

import * as noteActions from '../../actions/notes'
import {useNavigation} from '@react-navigation/native'

const Note = ({note, deleteNote, seeNote}) => {
    const navigation = useNavigation()
    return(
        <View style={{...styles.container, backgroundColor:note.color, opacity:0.7}}>
            <TouchableOpacity onLongPress={deleteNote} onPress={() => seeNote(navigation)}>
                <Text numberOfLines={2}>{note.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFFF99',
        height:40,
        alignContent:'center',
        justifyContent:'center',
        borderRadius:12,
        marginBottom:4,
        borderWidth:1,
        borderColor:"rgba(255,255,255,0.7)"
    }
})

export default connect(
    undefined,
    (dispatch, {note})=>({
        deleteNote(){
            dispatch(noteActions.startRemovingNote(note))
        },
        seeNote(navigation){
            dispatch(noteActions.selectNote(note))
            navigation.navigate('NoteDetails')
        }
    })
)(Note)