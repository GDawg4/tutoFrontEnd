import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import styles from './styles';
import * as selectors from '../../reducers';

// se muestran los detalles de la nota selccionada
const NoteDetails = ({ selectedNote }) => {
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{selectedNote.title}</Text>
                <View style={{...styles.square, backgroundColor: selectedNote.color}}/>
            </View>
            <Text style={styles.parragraph}>{selectedNote.content}</Text>
        </View>
    )
};


export default connect(
    state => ({
        selectedNote:selectors.getSelectedNote(state)
    }),
    undefined
)(NoteDetails)