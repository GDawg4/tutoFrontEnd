import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import DaySchedule from '../DaySchedule'
import WeekScheduler from '../WeekScheduler'
// Componente de librería
// FlatList que renderiza los libros comprados por el usuario
const Profile = () => {
    
    return (
        <View >
            <WeekScheduler />
        </View>
    )
};


export default connect(
    state => ({

    }),
    dispatch => ({
    })
)(Profile);