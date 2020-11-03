import React from 'react';
import { ScrollView, Text } from 'react-native';

import lowerCase from 'lodash/lowerCase';

import styles from './styles';
import Tutor from "../Tutor";

//Lista de autores
// Muestra todos los autores resultantes de la búsqueda
const TutorList = ({ tutors, filter, navigation }) => (
    <ScrollView horizontal={true} style={styles.tutorsContainer}>
        {
            tutors.filter(tutor => lowerCase(tutor.name).includes(lowerCase(filter))).length === 0
                ?
                <Text style={styles.infoMessage}>{filter}</Text>
                :
                tutors.filter(tutor => lowerCase(tutor.name).includes(lowerCase(filter))).map(tutor =>
                    <Tutor key={tutor.id} tutor={tutor} navigation={navigation}/>
                )
        }
    </ScrollView>
);

export default TutorList;