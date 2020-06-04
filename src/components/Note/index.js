import React from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';
import * as noteActions from '../../actions/notes';
import { useNavigation } from '@react-navigation/native';

// componente de nota
const Note = ({ note, deleteNote, seeNote }) => {
    const navigation = useNavigation()

    return(
        <TouchableOpacity style={{...styles.container, backgroundColor: note.color, opacity:0.7}} onLongPress={deleteNote} onPress={() => seeNote(navigation)}>
            <Text style={styles.title} numberOfLines={2}>{note.title}</Text>
        </TouchableOpacity>
    )
}

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