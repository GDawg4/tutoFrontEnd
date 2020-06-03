import React from 'react'
import {connect} from 'react-redux'
import {Text, View, StyleSheet} from 'react-native'
import {Form, Field, reduxForm, formValueSelector} from "redux-form";
import { v4 as uuidv4 } from 'uuid';

import * as selectors from '../../reducers'
import * as notesActions from '../../actions/notes'
import TitleBox from "../TitleBox";
import Button from "../Button";
import ColorPicker from "../ColorPicker";
import {getColorByValue} from '../../resources/utils'
import ReviewBox from "../ReviewBox";

const NewNote = ({selectedBook, currentColor, saveNote}) => {
    return(
        <View style = {styles.container}>
            <Text style={styles.header}>{selectedBook.title}</Text>
            <Field
                component={TitleBox}
                name={'title'}
                placeholder={'Give your note a title'}
                multiline={true}
                autoCapitalize='words'
                returnKeyType='done'/>
            <Text style={{...styles.header, color: currentColor}}>Select a color for your note</Text>
            <Field component={ColorPicker}
                   name={'color'}
                   min={0}
                   max={2}
                   step={1}/>
           <Field
               component={ReviewBox}
               name={'content'}
               placeholder={'Write your note here'}
               returnKeyType='done'/>
            <Button remove={false} label={'Save'} disabled={false} onPress={saveNote}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '5%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    header: {
        alignSelf: 'flex-start',
        color: '#428AF8',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'left',
        marginLeft:'5%'
    },
    headerTwo: {
        alignSelf: 'flex-start',
        color: '#428AF8',
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center',
        marginLeft:'5%'
    },
    middleContainer: {
        flex: 3,
        paddingTop: 16,
        width: '90%',
        marginBottom: 16,
    },
    innerContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    booksContainer: {
        paddingLeft: 16,
        flex: 1,
        flexWrap: 'wrap',
        width: '100%'
    },
    infoMessage: {
        alignSelf: 'flex-start',
        color: '#BEBEBE',
        fontSize: 14,
        marginBottom: 32,
        marginTop: 16,
        textAlign: 'center',
    }
});

const selector = formValueSelector('note')

export default reduxForm({
    form: 'note',
})(connect(
    state=>({
        selectedBook:selectors.getSelectedBook(state),
        currentColor:getColorByValue(selector(state, 'color')),
        currentTitle:selector(state, 'title'),
        currentContent:selector(state, 'content'),
    }),
    dispatch=>({
        saveNote(note){
            dispatch(notesActions.startAddingNote(note))
        }
    }),
    (stateProps, dispatchProps) => ({
        selectedBook:stateProps.selectedBook,
        currentColor:stateProps.currentColor,
        saveNote(){
            dispatchProps.saveNote({
                id:uuidv4(),
                title:stateProps.currentTitle,
                content:stateProps.currentContent,
                book:stateProps.selectedBook.id,
                color:stateProps.currentColor
            })
        }
    })
)(NewNote))