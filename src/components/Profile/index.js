import React from 'react'
import { View, FlatList, RefreshControl, Text } from 'react-native';
import DaySchedule from '../DaySchedule'
import * as selectors from '../../reducers'
import Author from "../Author";
import AuthorDetails from "../AuthorDetails";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-native";
import * as userActions from "../../actions/users";

// Componente de librería
// FlatList que renderiza los libros comprados por el usuario

const Profile = ({user, show}) => {
    return (
            <View >

                {/*<WeekScheduler />*/}
                <AuthorDetails selectedAuthor={user}/>
                <Link to="/">
                    <Text
                        style={{
                            textAlign: 'center',
                            color: '#3b3b3b',
                            textDecorationLine: 'underline',
                            textDecorationColor: '#3b3b3b',
                        }}
                    >
                        Cerrar sesión
                    </Text>
                </Link>

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