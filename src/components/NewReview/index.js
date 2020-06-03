import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {reduxForm, Field, clearFields, formValueSelector, reset} from 'redux-form';
import { v4 as uuidv4 } from 'uuid';

import * as selectors from '../../reducers'
import * as reviewActions from '../../actions/reviews'
import TitleBox from "../TitleBox";
import ReviewBox from "../ReviewBox";
import Button from "../Button";
import SliderBox from "../SliderBox";
import {sub} from "react-native-reanimated";

const NewReview = ({navigation, selectedBook, submitReview, currentScore})=>(
    <View style={styles.container}>
        <Text style={styles.header}>{selectedBook.title}</Text>
        <Field
            component={TitleBox}
            name={'title'}
            placeholder={'Give your review a title'}
            multiline={true}
            autoCapitalize='words'
            returnKeyType='done'/>
        <Text style={styles.headerTwo}>What did you think about the book?</Text>
        <Field
            component={ReviewBox}
            name={'review'}
            placeholder={'Write your review here'}
            returnKeyType='done'/>
        <Text style={styles.headerTwo}>{`What would you rate it? ${currentScore ? currentScore:'N/A'}/10`}</Text>
        <Field
            component={SliderBox}
            name={'rating'}
            min={0}
            max={10}
            step={1}
        />
        <Button remove={false} label={'Submit'} disabled={false} onPress={submitReview}/>
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
    infoMessage: {
        alignSelf: 'flex-start',
        color: '#BEBEBE',
        fontSize: 14,
        marginBottom: 32,
        marginTop: 16,
        textAlign: 'center',
    }
});

const titleValue = formValueSelector('review')

export default reduxForm({
    form: 'review',
})
(connect(
    state => ({
        selectedBook:selectors.getSelectedBook(state),
        currentTitle:titleValue(state, 'title'),
        currentContent:titleValue(state, 'review'),
        currentScore:titleValue(state, 'rating')
    }),
    dispatch =>({
        submitReview(review){
            dispatch(reviewActions.startAddingReview(review))
        },
        clearForm(){
            reset('review')
        }
    }),
    (stateProps, dispatchProps, {navigation})=>({
        selectedBook:stateProps.selectedBook,
        currentScore:stateProps.currentScore,
        submitReview(){
            dispatchProps.submitReview({
                'id':uuidv4(),
                "title": stateProps.currentTitle,
                "content": stateProps.currentContent,
                "score": stateProps.currentScore,
                "book": stateProps.selectedBook.id
            })
            dispatchProps.clearForm()
            navigation.navigate('HomeDetails')
        }
    })
)(NewReview))