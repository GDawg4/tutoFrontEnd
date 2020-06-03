import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {View, Text, ScrollView, StyleSheet} from 'react-native'

import * as selectors from '../../reducers'
import * as notesActions from '../../actions/notes'
import Note from "../Note";
import Button from "../Button";

const NotePage = ({navigation, selectedBook, allNotes, fetchNotes, addNote}) => {
    useEffect(fetchNotes, [])
    return (
        <View style = {styles.container}>
            <Text>Notes on {selectedBook.title}</Text>
            <ScrollView>
                {allNotes.length === 0 ?
                    <Text>No hay nada aquí...</Text>:
                    allNotes.map(note => <Note key={note.id} note={note} navigation={navigation}/>)
                }
            </ScrollView>
            <Button label={'New note'} onPress={addNote}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'90%',
        marginLeft:'5%',
        marginTop:'5%'
    }
})

export default connect(
    (state) => ({
        selectedBook: selectors.getSelectedBook(state),
        allNotes:selectors.getAllNotes(state).filter(note => note.book === selectors.getSelectedBook(state).id)
    }),
    (dispatch) => ({
        fetchNotes(book){
            dispatch(notesActions.startNotesFetch(book))
        }
    }),
    (stateProps, dispatchProps, {navigation}) => ({
        selectedBook:stateProps.selectedBook,
        allNotes:stateProps.allNotes,
        fetchNotes(){
            dispatchProps.fetchNotes({
                'book':stateProps.selectedBook.id
            })
        },
        addNote(){
            navigation.navigate('NewNote')
        }
    })
)(NotePage)