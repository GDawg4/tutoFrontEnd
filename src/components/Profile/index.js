import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import DaySchedule from '../DaySchedule'
import WeekScheduler from '../WeekScheduler'
import * as selectors from '../../reducers'
import Button from "../Button";
import Author from "../Author";
import AuthorDetails from "../AuthorDetails";

// Componente de librería
// FlatList que renderiza los libros comprados por el usuario
const Profile = ({user, show}) => {

    return (
        <View>
            <AuthorDetails selectedAuthor={user}/>
        </View>
    )
};


export default connect(
    state => ({
        user:selectors.getInfo(state),
        show(){
            console.log(state)
        }
    }),
    dispatch => ({
    })
)(Profile);