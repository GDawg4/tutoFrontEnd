import React from 'react'
import { View, FlatList, RefreshControl, Text } from 'react-native';
import DaySchedule from '../DaySchedule'
import WeekScheduler from '../WeekScheduler'
import * as selectors from '../../reducers'
import Button from "../Button";
import Author from "../Author";
import AuthorDetails from "../AuthorDetails";
import {connect} from "react-redux";

// Componente de librería
// FlatList que renderiza los libros comprados por el usuario

const Profile = ({user, show}) => {
    return (
            <View >
                <Text>hellow</Text>
                {/*<WeekScheduler />*/}
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
    }),undefined)(Profile)