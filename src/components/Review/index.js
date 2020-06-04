import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

import styles from './styles';
import * as selectors from '../../reducers';
import * as reviewActions from '../../actions/reviews';

const Review = ({ review, deleteReview }) => (
    <TouchableOpacity onLongPress={deleteReview}>
        <View style = {styles.container}>
            <Text style={styles.text}>{review.reviewer}</Text>
            <View style={styles.rating}>
                <AntDesign name={review.score >= 1 ? "star" : "staro"} size={20} color='#F9D71C'/>
                <AntDesign name={review.score >= 2 ? "star" : "staro"} size={20} color='#F9D71C'/>
                <AntDesign name={review.score >= 3 ? "star" : "staro"} size={20} color='#F9D71C'/>
                <AntDesign name={review.score >= 4 ? "star" : "staro"} size={20} color='#F9D71C'/>
                <AntDesign name={review.score >= 5 ? "star" : "staro"} size={20} color='#F9D71C'/>
                <AntDesign name={review.score >= 6 ? "star" : "staro"} size={20} color='#F9D71C'/>
                <AntDesign name={review.score >= 7 ? "star" : "staro"} size={20} color='#F9D71C'/>
                <AntDesign name={review.score >= 8 ? "star" : "staro"} size={20} color='#F9D71C'/>
                <AntDesign name={review.score >= 9 ? "star" : "staro"} size={20} color='#F9D71C'/>
                <AntDesign name={review.score >= 10 ? "star" : "staro"} size={20} color='#F9D71C'/>
            </View>
            <Text style={styles.title}>{review.title}</Text>
            <Text style={styles.text}>{review.content}</Text>
        </View>
    </TouchableOpacity>
);


export default connect (
    (state, { review })=>({
        currentUser: selectors.getAuthUsername(state),
        canErase: selectors.getAuthUsername(state) === review.reviewer,
        review: review
    }),
    (dispatch, { review })=>({
        deleteReview(){
            dispatch(reviewActions.startRemovingReview(review.id))
        }
    }),
    (stateProps, dispatchProps)=>({
        review: stateProps.review,
        deleteReview(){
            if(stateProps.canErase){
                dispatchProps.deleteReview()
            }
        }
    })

)(Review)