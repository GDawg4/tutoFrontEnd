import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux'
import * as utils from "../../resources/utils";
import * as tutorActions from '../../actions/tutors'
import { getSelectedCourse } from '../../reducers/courses';
import { getSelectedTutor } from '../../reducers/tutor';

const Tutor = ({vertical = false, info, handleOnPress, navigation, selectTutor, test}) => (
    <TouchableOpacity onPress={selectTutor}>
        <View style={[styles.tagContainer, vertical ? styles.verticalTag : null]} >
            {console.log(info)} 
            <Text style={styles.title}>{info.user.name} {info.user.lastname}</Text>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    tagContainer: {
        width: '100%',
        height: 70,
        borderRadius: 16,
        backgroundColor: utils.getRandomColor(),
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
        marginBottom: 20
    },
    verticalTag: {
        marginBottom: 16
    },
    title: {
        fontSize: 18,
        color: '#FFFFFF'
    }
});

export default connect (
    (state)=>({
        test(){
            console.log(state)
        }
    }),
    (dispatch, {navigation, info})=>({
        selectTutor(){
            navigation.navigate('TutorDetails', 
                { userInfo: info.user})
            dispatch(tutorActions.selectTutor(info.id))
            console.log('selected tutor')
        }
    })
)
(Tutor)