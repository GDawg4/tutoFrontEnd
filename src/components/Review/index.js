import React from 'react'
import {connect} from 'react-redux'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'

import * as selectors from '../../reducers'
import * as reviewActions from '../../actions/reviews'

const Review = ({review, deleteReview}) => (
    <View>
        <TouchableOpacity onLongPress={deleteReview}>
            <View style = {styles.container}>
                <Text>{review.title}</Text>
                <Text>by: {review.reviewer}</Text>
            </View>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        height: 300,
        width: 150,
        borderRadius: 16,
        flex: 1,
        marginRight: 16,
        maxWidth: 150,
    }
})

export default connect (
    (state, {review})=>({
        currentUser:selectors.getAuthUsername(state),
        canErase:selectors.getAuthUsername(state) === review.reviewer,
        //Weird bug
        review:review
    }),
    (dispatch, {review})=>({
        deleteReview(){
            dispatch(reviewActions.startRemovingReview(review.id))
        }
    }),
    (stateProps, dispatchProps)=>({
        review:stateProps.review,
        deleteReview(){
            if(stateProps.canErase){
                dispatchProps.deleteReview()
            }
        }
    })

)(Review)