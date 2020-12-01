import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, ScrollView, Alert, Platform, Linking} from "react-native";
import {connect} from 'react-redux'
import {Field, Form, reduxForm, formValueSelector} from "redux-form";
import {v4 as uuidv4} from 'uuid'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

import Book from "../Book";
import * as selectors from '../../reducers'
import Button from "../Button";
import * as sessionActions from '../../actions/sessions'
import FormDateTimePicker from '../FormDateTimePicker'
const TutorDetails = (info) => {
    const infoUser = info.route.params.userInfo

//const TutorDetails = (info= { selectedTutor, authorBooks, navigation, onClick, showState, selectedDate}, route) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const toggleShow = () => {
        setDatePickerVisibility(!isDatePickerVisible)
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };
    return(
        <View style={styles.detailsContainer}>
            {console.log(infoUser)}
            {/*console.log(info)*/}
            <View style={styles.topContainer}>
                <Image source={require('../../assets/default_pp.png')} style={styles.authorPic}/>
                <View style={styles.authorInfo}>
                  <Text style={styles.name}> Nombre: {infoUser.name} {infoUser.lastname}</Text>
                  <Text style={styles.bio}> correo: {infoUser.email}</Text>
                </View>
            </View>
            <View style={styles.middleContainer}>
                <Text style={styles.header}>Acciones disponibles</Text>

                <Button
                    color="#078b45"
                    label={'   Solicitar Tutoría   '}
                    onPress={() => {
                        Linking.openURL(`mailto:${infoUser.email}?subject=${'Solicitud de tutorías '}&body=Deseo agendar una tutoría`)
                    }}
                />
                <Button
                    onPress={() => {
                        Linking.openURL('https://calendar.google.com')
                    }}
                    label={'   Calendario  '}/>
            </View>
        </View>
    )};

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    topContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '90%',
        paddingTop: 16,
        flexDirection: 'row',
    },
    middleContainer: {
        flex: 3,
        width: '90%',
        marginTop: 32
    },
    authorInfo: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    authorPic: {
        height: 150,
        width: 150,
        borderRadius: 75,
        resizeMode: 'cover'
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'justify',
    },
    bio: {
        textAlign: 'justify',
        width: '90%'
    },
    horizontalScroll: {
        paddingLeft: 16,
        flex: 1,
        flexWrap: 'wrap'
    },
    header: {
        alignSelf: 'flex-start',
        color: '#428AF8',
        fontSize: 20,
        marginBottom: 16
    },
});

const dateSelector = formValueSelector('date')

export default reduxForm({
    form:'date'
})(connect (
    state=>({
        //user:selectors.getUser(state, id ),
        //allTutors:selectors.getAllTutors(state)
        // selectedDate:dateSelector(state, 'DayPicker'),
        // showState(){
        //     // console.log(state.form.date.values)
        // }
    }),
    (dispatch, {navigation})=>({
        onClick({selectedTutor, selectedClass}){
            /*dispatch(sessionActions.startAddingSession(
                {
                    'id':getUuid(),
                    'tutor':selectedTutor.id,
                    'hora':'Martes 11:00 am',
                    'clase':selectedClass.id
                }))*/
            console.log('Tutoría apartada')
            navigation.navigate('Home')
        }
    })
)
(TutorDetails))