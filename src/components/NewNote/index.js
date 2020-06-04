import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Field, reduxForm, formValueSelector } from "redux-form";
import { v4 as uuidv4 } from 'uuid';

import TitleBox from "../TitleBox";
import Button from "../Button";
import ColorPicker from "../ColorPicker";
import ReviewBox from "../ReviewBox";

import styles from './styles';
import * as selectors from '../../reducers';
import * as notesActions from '../../actions/notes';
import { getColorByValue } from '../../resources/utils';

// componente para crear una nueva nota acerca de un libro
// form hecho con redux-form
const NewNote = ({ selectedBook, currentColor, saveNote }) => {
    return(
        <View style = {styles.container}>
            <Text style={styles.header}>{selectedBook.title}</Text>
            <View style={styles.ninetiesContainer}>
                <Field
                    component={TitleBox}
                    name={'title'}
                    placeholder={'Give your note a title'}
                    autoCapitalize='words'
                    returnKeyType='done'
                />
            </View>
            <Text style={{...styles.header, color: currentColor}}>Select a color for your note</Text>
            <Field 
                component={ColorPicker}
                name={'color'}
                min={0}
                max={2}
                step={1}
            />
           <Field
               component={ReviewBox}
               name={'content'}
               placeholder={'Write your note here'}
               returnKeyType='done'
            />
            <View style={styles.ninetiesContainer}>
                <Button remove={false} label={'Save'} disabled={false} onPress={saveNote}/>
            </View>
        </View>
    )
}


const selector = formValueSelector('note');

export default reduxForm({
    form: 'note',
})(connect(
    (state, { navigation }) =>({
        selectedBook: selectors.getSelectedBook(state),
        currentColor: getColorByValue(selector(state, 'color')),
        currentTitle: selector(state, 'title'),
        currentContent: selector(state, 'content'),
        navigation: navigation,
    }),
    dispatch=>({
        saveNote(note){
            dispatch(notesActions.startAddingNote(note))
        }
    }),
    (stateProps, dispatchProps) => ({
        selectedBook: stateProps.selectedBook,
        currentColor: stateProps.currentColor,
        saveNote(){
            dispatchProps.saveNote({
                id: uuidv4(),
                title: stateProps.currentTitle,
                content: stateProps.currentContent,
                book: stateProps.selectedBook.id,
                color: stateProps.currentColor
            })
            stateProps.navigation.navigate("Notes")
        }
    })
)(NewNote))