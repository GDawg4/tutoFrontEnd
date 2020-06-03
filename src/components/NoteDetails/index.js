import React from 'react'
import {connect} from 'react-redux'
import {Text, View, StyleSheet} from 'react-native'

import * as selectors from '../../reducers'

const NoteDetails = ({selectedNote}) => {
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{selectedNote.title}</Text>
                <View style={{...styles.square, backgroundColor: selectedNote.color}}/>
            </View>
            <Text>{selectedNote.content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'90%',
        marginLeft:'5%',
        marginTop:'5%',
    },
    header: {
        alignSelf: 'flex-start',
        color: '#428AF8',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 8,
    },
    square:{
        height:24,
        width: 24,
        opacity:0.7,
        marginLeft: '10%',
        borderWidth:2,
        borderColor:'#000000',
    },
    headerContainer:{
        display:'flex',
        flexDirection:'row'
    }
})

export default connect(
    state => ({
        selectedNote:selectors.getSelectedNote(state)
    }),
    undefined
)(NoteDetails)