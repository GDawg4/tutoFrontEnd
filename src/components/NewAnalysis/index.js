import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Field, formValueSelector, reduxForm, reset} from "redux-form";

import TitleBox from "../TitleBox";
import ReviewBox from "../ReviewBox";
import Button from "../Button";
import {connect} from "react-redux";
import * as selectors from "../../reducers";
import * as analysisActions from "../../actions/analysis";

const NewAnalysis = ({navigation, selectedBook, submitAnalysis, currentScore})=>(
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
    buttonContainer: {
        marginTop: 32,
        width: '90%'
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

const titleValue = formValueSelector('analysis')

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