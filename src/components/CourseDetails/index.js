import React from 'react'
import {Image, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native'
import {connect} from "react-redux";


import * as selectors from '../../reducers'
import Tutor from "../Tutor";
import includes from 'lodash/includes'
const CourseDetails = ({selectedCourse, isFetching, onLoad, navigation, allTutors}) => (

    <View style={styles.container}>
        
        <View style={styles.topContainer}>
            <View style={styles.bookInfo}>
                <Text style={styles.header}>{selectedCourse.name}</Text>
                <Text style={styles.header}>{selectedCourse.code}</Text>
                <Text style={styles.parragraph}>Este curso se centra en el estudio de </Text>
            </View>
        </View>
        <ScrollView style={styles.bottomContainer}>
            <Text style={styles.header}>Tutores disponibles</Text>
            <ScrollView horizontal={false} contentContainerStyle={styles.horizontalScroll}>
                <View>
                    {
                        allTutors.length === 0 ?
                            <Text>
                                No hay tutores disponibles en esta clase
                            </Text> :
                        allTutors.map(tutor=> <Tutor info={tutor} navigation={navigation}/>)
                    }
                    {console.log(allTutors)}
                </View>
            </ScrollView>
        </ScrollView>
    </View>



)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#FFFFFF'
    },
    topContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '95%'
    },
    middleContainer:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '80%'
    },
    bottomContainer:{
        flex: 4,
        marginTop: 32,
        width: '90%'
    },
    similiarBooks: {
        marginTop: 32,
        width: '100%'
    },
    header: {
        alignSelf: 'flex-start',
        color: '#078b45',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 8
    },
    bookImage: {
        height: 200,
        width: 150,
        justifyContent: 'center',
        borderRadius: 8,
        resizeMode: 'stretch'
    },
    author: {
        fontSize: 14,
        marginBottom: 4
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    price: {
        fontSize: 12,
        marginBottom: 24
    },
    parragraph: {
        fontSize: 14,
        textAlign: 'justify',
        marginBottom: 16,
        width:'100%'
    },
    bookInfo: {
        paddingLeft: 16,
        width: '60%',
        justifyContent: 'center'
    },
    remove: {
        color: 'red'
    },
    add: {
        color: '#078b45'
    },
    notes:{
        color:'yellow'
    },
    horizontalScroll: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    infoMessage: {
        alignSelf: 'center',
        color: 'grey',
        fontSize: 14,
        marginBottom: 16,
        marginTop: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        paddingTop: 16
    }
});
const a = (state) => {
    selectors.getAllTutors(state).filter(tutor => tutor.course === selectors.getSelectedCourse(state).id)
    console.log(state)
}
export default connect(
    (state)=>({
        selectedCourse:selectors.getSelectedCourse(state),
        isFetching:selectors.getIsFetchingCourses(state),
        allTutors:selectors.getAllTutors(state).filter(tutor => includes(tutor.course, selectors.getSelectedCourse(state).id))
    }),
    (dispatch)=>({
        onLoad(){
            console.log('yay')
        }
    })
) (CourseDetails)