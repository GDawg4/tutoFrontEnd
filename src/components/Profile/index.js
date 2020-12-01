import React, {useLayoutEffect} from 'react'
import { View, FlatList, RefreshControl, Text, Alert } from 'react-native';
import DaySchedule from '../DaySchedule'
import * as selectors from '../../reducers'
import Author from "../Author";
import AuthorDetails from "../AuthorDetails";
import {connect} from "react-redux";
import * as authActions from '../../actions/auth'
import {Redirect} from 'react-router-dom'
import { AntDesign } from '@expo/vector-icons';

// Componente de librería
// FlatList que renderiza los libros comprados por el usuario

const Profile = ({user, show, logOut, loggedOut, navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <AntDesign
                    name="logout"
                    size={20}
                    color="#F55E64"
                    style={{ marginRight: 16 }}
                    onPress={() =>
                        Alert.alert(
                            'Log Out?',
                            'You´re about to exit the app.',
                            [
                                {
                                    text: 'Stay',
                                    style: 'cancel'
                                },
                                {
                                    text: 'Log Out',
                                    onPress: () => logOut(),
                                    style: 'destructive'
                                }
                            ],
                            {
                                cancelable: true,
                            },
                        )
                    }
                />
            )
        })
    })
    if (loggedOut) {
        return(
            <Redirect to="/"/>
        )
    }
    return (
            <View >
                {/*<WeekScheduler />*/}
                <AuthorDetails selectedAuthor={user}/>
            </View>
    )
};

export default connect(
    state => ({
        user:selectors.getInfo(state),
        loggedOut: selectors.getAuthToken(state) === null,
        show(){
            console.log(state)
        }
    }),
    (dispatch) => ({
        logOut(){
            dispatch(authActions.logout())
        }
    })
)(Profile)