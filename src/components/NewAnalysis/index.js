import React from 'react';
import { connect } from "react-redux";
import { View, Text } from 'react-native';
import { Field, formValueSelector, reduxForm, reset } from "redux-form";

import TitleBox from "../TitleBox";
import ReviewBox from "../ReviewBox";
import Button from "../Button";

import styles from './styles';
import * as selectors from "../../reducers";
import * as analysisActions from "../../actions/analysis";

// componente para crear un análisis, hecho con redux-form
const NewAnalysis = ({ navigation, selectedBook, submitAnalysis, currentScore })=>(
    <View style={styles.container}>
        <Text style={styles.header}>{selectedBook.title}</Text>
        <Field
            component={TitleBox}
            name={'title'}
            placeholder={'Give your analysis a title'}
            multiline={true}
            autoCapitalize='words'
            returnKeyType='done'
        />
        <Text style={styles.headerTwo}>What are your thoughts on this book?</Text>
        <Field
            component={ReviewBox}
            name={'analysis'}
            placeholder={'Write your thoughts here'}
            returnKeyType='done'
        />
        <View style={styles.buttonContainer}>
            <Button label={'Submit'} disabled={false} onPress={()=>submitAnalysis()}/>
        </View>
    </View>
)


const titleValue = formValueSelector('analysis');

export default reduxForm({
    form: 'analysis',
})
(connect(
    state => ({
        selectedBook:selectors.getSelectedBook(state),
        currentTitle:titleValue(state, 'title'),
        currentContent:titleValue(state, 'analysis')
    }),
    dispatch =>({
        submitAnalysis(analysis){
            dispatch(analysisActions.startAddingAnalysis(analysis))
        },
        clearForm(){
            reset('analysis')
        }
    }),
    (stateProps, dispatchProps, {navigation})=>({
        selectedBook:stateProps.selectedBook,
        currentScore:stateProps.currentScore,
        submitAnalysis(){
            dispatchProps.submitAnalysis({
                "title": stateProps.currentTitle,
                "content": stateProps.currentContent,
                "book": stateProps.selectedBook.id
            })
            dispatchProps.clearForm()
            navigation.navigate('HomeDetails')
        }
    })
)(NewAnalysis))