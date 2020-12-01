import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as utils from "../../resources/utils";
import {connect} from "react-redux";

import * as courseActions from "../../actions/courses";

const Course = ({vertical = false, course, press, navigation}) => (
    <TouchableOpacity onPress={press}>
        <View style={[styles.tagContainer, vertical ? styles.verticalTag : null]} >
            <Text style={styles.title}>{course.name}</Text>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    tagContainer: {
        width: 150,
        height: 125,
        borderRadius: 16,
        backgroundColor: '#4dbfdd',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
    },
    verticalTag: {
        marginBottom: 16
    },
    title: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center'
    }
});

export default connect(
    undefined,
    (dispatch, { course, navigation }) => ({
        press(){
            dispatch(courseActions.selectCourse(course.id));
            navigation.navigate('CourseDetails')
            console.log('selected')
        }
    })
)(Course)